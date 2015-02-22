var Browser = require('zombie');

Browser.visit("http://192.168.1.9/tests/basic.html", function(e, browser) {
	console.log(browser.html())
});