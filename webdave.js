#!/usr/bin/env node
/**
 * WebDave - your webdav mate
 * Add install path
 * export PATH="$PATH:/home/jerram/node_modules/:/var/www/cakephp/cake/console/"
 *
 * set up webdave.yml in your working folder like
 * remote: https://store-abdce1.mybigcommerce.com/dav/template/
 * user: admin
 * pass: yourpass
 *
 * run the script from your working folder
 * /var/vhosts/bigcommerce/your-bc-template$ webdave test.html
 *
 */

 /**
 * TODO
 * So I want to enable async uploads, but limited to say ten.
 * I can use the async library, need to add it at line 74
 * https://github.com/caolan/async
 * http://stackoverflow.com/questions/9539886/limiting-asynchronous-calls-in-node-js
 *
 * Redo the run logic in a node like way -
 *
 * Also get md5 and see what really needs to be uploaded - "allprop":"getetag"
 * https://blogs.oracle.com/arnaudq/entry/propfind_using_curl
 * http://uwiki.org/uwiki/curl_dav.html
 * http://tools.ietf.org/html/rfc2518#page-26
 *
 * Then add git awareness
 * https://github.com/pvorb/node-git-wrapper
 *
 * Finally it would be nice to run the script at the start of a session
 * and push whatever is staged
 */

var $ = require('jquery');
var util = require('util')
var exec = require('child_process').exec;
var fs = require('fs');
var loaddir = require('loaddir');
var execSync = require("exec-sync");
var async = require("async");
var local = process.cwd();
var YAML = require('yamljs');
var endpoint = YAML.load('webdave.yml');
var sys = require('sys')
var exec = require('child_process').exec;

// TWS
//var local = '/var/vhosts/tws/template/';
//var remote = 'https://store-raa4hjlf.mybigcommerce.com/dav/template/';
//var user = 'portable';
//var pass='portshop1!';

var input = process.argv.slice(2);
var queue = async.queue(runUpload, 2); // Run ten simultaneous uploads

queue.drain = function() {
    console.log("All files are uploaded");
    //process.exit(code=0);
};

function puts(error, stdout, stderr) {
    util.print('stdout: ' + stdout);
    util.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
}

function all(){
    console.log('push all files from a location');
    files = []
    loaddir({
        path: local,
        callback: function(){  files.push(this.relativePath + this.fileName); }
    })
    uploadFiles(files);
    return true;
}

function files (){
    var files = process.argv.slice(2);
    uploadFiles(files);
    return true;
}

function uploadFiles(files, callback){
    console.log('Uploading...');
    $.each(files, function( index, file ){
        if (file != '') {
            command = util.format("curl --digest --user '%s:%s' -T '%s/%s' '%s%s'", endpoint.user, endpoint.pass, local, file, endpoint.remote, file);
            console.log(file);
            result = execSync(command, puts);
        }
        // Convert this to async here I think
        //queue.push(command, function (err) {
        //        console.log('queued ' + path);
        //});
    });
    process.exit(code=0); // required for sync uploads, otherwise its just waits for more files
}

function runUpload(command, callback){
    console.log(command);
    result = exec(command);
    callback();
}

function gitFiles(error, stdout, stderr){
    console.log('Breaking up git file list and sending to upload');
    stdout.replace(/[\n]/g, '');
    var files = stdout.split('\n');
    uploadFiles(files);
}


if (input[0] == 'staged') {
    console.log('Sending staged files');
    exec("git diff --name-only --cached", gitFiles);
}
else if (input[0] == 'all') {
    all();
}
else {
    console.log('Try using input as file list');
    files();
}
