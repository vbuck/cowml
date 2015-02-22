var Browser = require('zombie');
var fs 		= require('fs');

function writeFile(html)
{
	fs.writeFile(__dirname + '/tests/basic.html', html, function(err) {
		console.log('It\'s saved!');
	})
}

Browser.visit("http://192.168.1.9/tests/basic.cowml.html", function(e, browser) {
	writeFile(browser.html());
});
