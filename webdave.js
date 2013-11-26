/**
 * WebDave - your webdav mate
 *
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
 *
 * Finally it would be nice to run the script at the start of a session
 * and push whatever is staged
 *
 */

var $ = require('jquery');
var util = require('util')
var exec = require('child_process').exec;
var fs = require('fs');
var loaddir = require('loaddir');
var execSync = require("exec-sync");
var async = require("async");

var local = '/var/vhosts/bigcommerce/blueprint/';
var remote = 'https://store-ihsuv3.mybigcommerce.com/dav/template/';
var user = 'admin';
var pass='jwatters2013';

var input = process.argv.slice(2);
var queue = async.queue(uploadFile, 10); // Run ten simultaneous uploads

queue.drain = function() {
    console.log("All files are uploaded");
};

function puts(error, stdout, stderr) {
    util.print('stdout: ' + stdout);
    util.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
}

function all(){
    console.log('push all files from a function ');
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
    $.each(files, function( index, path ){
        command = util.format("curl --digest --user '%s:%s' -T '%s%s' '%s%s'", user, pass, local, path, remote, path);
        console.log(path);
        // Convert this to async here I think
        //queue.push(file);
        result = execSync(command, puts);
    });
    callback();
    process.exit(code=0)
}

if (input[0] == 'git') {
    console.log('Do a git type command');
}
else if (input[0] == 'all') {
    all();
}
else {
    console.log('try using input as file list');
    files();
}
