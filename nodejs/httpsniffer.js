var util = require('util');
var url = require('url');

exports.sniffOn = function(server) {
	console.log("Sniffing: " + util.inspect(server));
	
	server.on('request', function(req, res) {
		util.log('e_request');
		util.log(reqToString(req));
	});
	
	server.on('connection', function(socket) {
		util.log('e_connection socket=' + util.inspect(socket, 1));
	});
	
	server.on('close', function(errno) {
		util.log('e_close errno=' + errno);
	});
	
	server.on('checkContinue', function(req, res) {
		util.log('e_checkContinue');
		util.log(reqToString(req));
		res.writeContinue();
	});
	
	server.on('upgrade', function(req, res, head) {
		util.log('e_upgrade');
	});
	
	server.on('clientError', function() {
		util.log('e_clientError');
	});	
}

var reqToString = function(req) {
	var ret = 'request ' + req.method + ' ' +
		req.httpVersion + ' ' + req.url + '\n';
	ret += JSON.stringify(url.parse(req.url, true)) + '\n';
	var keys = Object.keys(req.headers);
	for (var i = 0, l = keys.length; i < l; i++) {
		var key = keys[i];
		ret += i + ' ' + key + ': ' + req.headers[key] + '\n';
	}
	if(req.trailers) {
		ret += req.trailers + '\n';
	}
	return ret;
}

exports.reToString = reqToString;
