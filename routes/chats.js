var express = require('express');
var router = express.Router();
var Chat = require('../models/Chat');

/* GET All Chats page. */
router.get('/', function(req, res, next) {
   // res.send('Chats Index');
  //res.send('Hello World');
  Chat.find((err, data) => {
    res.render('../views/users/chats', 
        { title: 'User List', chats: data }
    );
  })
  
});

/* GET My List of Friends/Users in Contacts page. */
router.get('/chats', function(req, res, next) {
  Chat.find((err, data) => {
    if (err) throw err;
    res.render('../views/users/chats', { title: 'Select A Chat', chats: data });
  });
  
  //res.send('Hello World');
});

/**
 * {
 * user: [ 
        { type: mongoose.Schema.ObjectId, ref: 'User' }
    ], 
    msg:"Type a message", 
    created_at:  date
  }

 */

/* /** POST Request */
/* router.post('/chats', function(req, res, next) {
  console.log(req.body);
  Chat.create(req.body, (err) => {
      if(err) throw err;
      //io.emit('chat', req.body);
      //res.send(req.body);
      console.log('Chat Saved Successfully');
  });
}); */
 
/* GET Individual Chats By ID. */
router.get('/something', function(req, res, next) {
    res.send('Chats - One on One');
  //res.send('Hello World');
  
});

/** GET Request for Chat by Id */
router.get('/:id', (req, res) => {
  Chat.findById(req.params.id, (err, data) => {
    if (err) throw err;
    if(!data) return res.status(404).send('Conversation Does Not Exist with this Id.');
    //res.send(employee);
    res.render('../views/users/chats', { chat: data });
  })
});

module.exports = router;
