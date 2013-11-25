//var args = process.argv.slice(2);
//console.log('Hello ' + args.join(' ') + '!');

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var $ = require('jquery');
var util = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { util.puts(stdout) }


var local = '/var/vhosts/bigcommerce/blueprint-template/';
/**
var files = [
    'Panels/Footer.html',
    'Panels/Header.html',
    'Styles/portableshops-reset.css',
    'Styles/portableshops.css',
    'img/sprite-social-small.png'
];
*/

var files = process.argv.slice(2);
var remote = 'https://store-ihsuv3.mybigcommerce.com/dav/template/';
var user = 'admin';
var pass='jwatters2013';

$.each(files, function( index, path ){
    command = util.format("curl --verbose --digest --user '%s:%s' -T '%s%s' '%s%s'", user, pass, local, path, remote, path);
    console.log(path);
    exec(command, puts);
});

