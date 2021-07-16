var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET ALL users listing. */
router.get('/', function(req, res, next) {
  User.find((err, data) => {
    if (err) throw err;
    res.send(data);
    /* res.render('../views/users/users', 
        { title: 'User List', users: data }
    ); */
  });
});



/** GET Users by Id http://localhost:3000/users/:id */
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) throw err;
        if(!data)
            return res.status(404).send("User Not Found With The Given Id");
        res.send(data);
    });
});



/**POST Request to insert new data - for Registration User */
/* POST users listing. */
/**
 *    Url http://localhost:3000/users
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
router.post('/', (req, res) => {
  //var user = new User(req.body);
  User.create(req.body, (err, data) => {
    if (err) throw err;
    res.send(data);
    //res.redirect('/');
  })
});



/** Delete User by Id */
router.delete('/:id', (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) throw err;
        if (!data)
             return res.status(404).send("User doesn't exist with given Id");
        User.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) throw err;
            res.send(data);
        });
    });
});



/** GET USERS BY ID DURING REGISTRATION */
router.get('/views/registration', (req, res) => {
  const user = new User();
  console.log(this.user);
  User.findById(req.params.id, (err, data) => {

  });
});
 
module.exports = router;
