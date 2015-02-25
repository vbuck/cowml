var settings	= require('./config.js');  	// config file
var Browser 	= require('zombie');
var fs 			= require('fs');			// file system

var files = settings.fileNames;
var numberOfFiles = files.length;
var i = 0

function writeFile(html, fileName)
{
	fs.writeFile(__dirname + '/tests/' + fileName + '.html', html, function(err) {
		if (err != null)
		{
			console.log(err);
			return; // exit if there's an error
		}
		console.log('CowML compilation complete: ' + fileName);
		i++;
		parseFile()
	});
};

function parseFile()
{
	if (i == numberOfFiles)
		return;

	var fileName = settings.fileNames[i]
	var url = settings.url + fileName + '.cowml';

	Browser.visit(url, function(e, browser) {
		writeFile(browser.html(), fileName);
	});
}

parseFile();
