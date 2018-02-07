var express = require('express');
var proxy = require('http-proxy-middleware')


/* GET home page. */


module.exports = function(uri){
	var router = express.Router();
	router.use('/',proxy({
		target:uri,
		changeOrigin:true,
		ws:true
	}));
	return router
};
