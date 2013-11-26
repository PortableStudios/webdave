var $ = require('jquery');
var util = require('util')
var exec = require('child_process').exec;
var local = '/var/vhosts/bigcommerce/blueprint-template/';
var remote = 'https://store-ihsuv3.mybigcommerce.com/dav/template/';
var user = 'admin';
var pass='jwatters2013';

function puts(error, stdout, stderr) {
    util.print('stdout: ' + stdout);
    util.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
}

function files (){
    var files = process.argv.slice(2);

    $.each(files, function( index, path ){
        command = util.format("curl --digest --user '%s:%s' -T '%s%s' '%s%s'", user, pass, local, path, remote, path);
        console.log(path);
        result = exec(command, puts);
    });
}

function all(){
    console.log('push all files from a function ');

}

var input = process.argv.slice(2);


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
