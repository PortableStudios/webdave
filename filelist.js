var $ = require('jquery');
var util = require('util')
var exec = require('child_process').exec;
var fs = require('fs');
var loaddir = require('loaddir');
var execSync = require("exec-sync");

var local = '/var/vhosts/bigcommerce/blueprint/';
var remote = 'https://store-ihsuv3.mybigcommerce.com/dav/template/';
var user = 'admin';
var pass='jwatters2013';
var input = process.argv.slice(2);

var propfind = '<?xml version="1.0" encoding="utf-8" ?><D:propfind xmlns:D="DAV:"><D:allprop/></D:propfind>';

// curl --request PROPFIND  --digest --user admin:jwatters2013 --header "Content-Type: text/xml" --header "Brief:t" --data '<?xml version="1.0" encoding="utf-8" ?><D:propfind xmlns:D="DAV:"><D:allprop/></D:propfind>' https://store-ihsuv3.mybigcommerce.com/dav/template/
// will return md5 in addition to filename and dates. boom.
