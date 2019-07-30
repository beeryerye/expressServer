const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));

app.get('/', function(req, res){
	console.log('Hello world.');
	res.send('Hello world.');
})

app.listen(3000);
console.log('Server is running on port 3000...');