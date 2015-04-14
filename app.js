'use strict';

var express = require('express');
var app = express();

var redis = require('redis');
var redisClient = redis.createClient();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static('public'));

// add persistant layer

// var movies = [{
// 	title: 'House of Cards (US TV Series)',
// 	type: 'series',
// 	year: 2012,
// 	added: +new Date() - 9000000
// }, {
// 	title: 'Love Actually',
// 	type: 'movie',
// 	year: 2003,
// 	added: +new Date() - 6500000
// }, {
// 	title: 'Bodyguard',
// 	type: 'movie',
// 	year: 1996,
// 	added: +new Date() - 12000000
// }];

app.get('/movies', function(request, response) {
	redisClient.lrange('movies', 0, -1, function(error, messages) {
		var movies = [];

		messages.forEach(function(message) {
			movies.push(JSON.parse(message));
		});

		response.json(movies);	
	});
});

app.post('/movies', function(request, response) {
	var model = request.body;
	console.log(model);

	var message = JSON.stringify(model);
	redisClient.lpush('movies', message, function(error, response) {

	});

	response.status(201).json(model);
});

app.listen(3000, function() {
	console.log('Server started');
});
