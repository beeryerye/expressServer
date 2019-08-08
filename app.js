const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index',{title: 'Welcome'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport ({
		service: 'Gmail',
		auth: {
			user: 'me@g.mail',
			pass: ''
		}
	});
	var mailOptions = {
		from: 'Dude Duderson <me@g.mail',
		to : 'other@g.mail',
		subject: 'Submission',
		text: 'You have submission with details: Name: '+req.body.name+', Email: '+req.body.email+', Message: '+req.body.message,
		html: 'You have submission with details:<ui><li> Name: '+req.body.name+'</li><li> Email: '+req.body.email+' </li><li>Message: '+req.body.message+'</li></ui><p>'
	}

  transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('Server is running on port 3000...');