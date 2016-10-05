var express = require('express');
var router = express.Router();
var users = require('../users/').users;
var usernames = Object.keys(users);

router.get('/', function(req, res){
	if(req.session.redirect){
		res.render('index', {
			message: 'Wrong combination of username/password'
		});
	}else{
		res.render('index', {message:''});
	}
});

router.post("/app", function(req, res) {
	var params = req.body; 
    var username = params.username;
    if(usernames.indexOf(username) == -1 || users[username].password != params.password){
		req.session.redirect = true;
		res.redirect('/');		
	}else{
		req.session.redirect = false;
		res.render('app', {user: username});
	}
});


module.exports = router;
