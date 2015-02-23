var config 	= require('./config.js');
var Browser = require('zombie');
var fs 		= require('fs');

settings 	= config.options;

function writeFile(html)
{
	fs.writeFile(__dirname + '/' + settings.destination, html, function(err) {
		console.log('CowML compilation complete');
	});
}

Browser.visit(settings.source, function(e, browser) {
	writeFile(browser.html());
});
