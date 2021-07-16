var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find((err, data) => {
    if (err) throw err;
    //res.send(data);
    res.render('../views/users/users', 
        { title: 'User List', users: data }
    );
  })
});

/**POST Request to insert new data - for Registration User */
/* POST users listing. */
/**
 * {
    "username": "User 1",
    "email": "user1@user.com",
    "dob": "11-07-2021",
    "phoneNumber": "0812345678",
    "password": "mypassword",
    "confirmPassword": "mypassword",
    "is_active": true
}
 */

router.post('/save', function(req, res, next) {
  var user = new User(req.body);
  User.create(req.body, (err, data) => {
    if (err) throw err;
    //res.send(data);
    res.redirect('/');
  })
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('../views/users/login', { title: 'Login Page' });
  //res.send('Hello World');
});

/* GET Registration page. */
router.get('/register', function(req, res, next) {
  res.render('../views/users/registration', { title: 'Registration Page' });
  //res.send('Hello World');
});

/* GET My List of Friends/Users in Contacts page. */
router.get('/contacts', function(req, res, next) {
  User.find((err, data) => {
    if (err) throw err;
    res.render('../views/users/contacts', { title: 'Select Chat Room', friends: data });
  });
  
  //res.send('Hello World');
});

module.exports = router;
