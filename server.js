var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/* app.use(express.static(__dirname));
 */

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var chatsRouter = require('./routes/chats');

//Models
var User = require('./Models/User');
var Chat = require('./Models/Chat');

//Connect to Database
mongoose.connect('mongodb://localhost:27017/projectdb',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected To Database!!!'); })
    .catch((error) => { console.log(error); })

// HANDLING WEB SOCKETS
users = [];
var roomno = 1;
io.on('connection', (socket) => {
    console.log('A Socket is Connected');

    //Increase roomno 2 clients are present in a room.
    if (io.sockets.adapter.rooms["room-" + roomno]
        && io.sockets.adapter.rooms["room-" + roomno].length > 1) roomno++;
    socket.join("room-" + roomno);

    //Send this event to everyone in the room.
    io.sockets.in("room-" + roomno)
        .emit('connectToRoom', "Room " + roomno);

    socket.on('setUsername', function (data) {
        console.log(data);
        users.push(data);
        socket.emit('userSet', { username: data });
    });

    socket.on('msg', function (data) {
        //Broadcast message to everyone connected to the socket
        io.sockets.emit('newmsg', data);
    });

    // Invoked when user gets diconnected
    socket.on('disconnect', () => {
        /* var user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message', 
                formatMessage("OPEN Chat", `${user.username} has left the chat`)
            )
        } */
        console.log('A Socket is Disconnected!!!');
    });
});

/* GET ALL users listing. */
app.get('/users', function(req, res, next) {
    User.find((err, data) => {
      if (err) throw err;
      res.send(data);
      /* res.render('../views/users/users', 
          { title: 'User List', users: data }
      ); */
    });
  });

  app.get('/login', function(req, res, next) {
    User.find((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  });

  /* GET One users listing. */
app.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password
    User.find((err, data) => {
      if (err) throw err;
      
      for (const user in data){
        if(user.email == email && user.password == password){
           return res.send(data);
         }
          if(!(user.email == email && user.password == password)){
              return res.status(404).json("User with given password does not exit");
          } 
          
      }
      
      /* res.render('../views/users/users', 
          { title: 'User List', users: data }
      ); */
    });
  });

//-------------USERS-----------------------
//User Registration
app.post('/users', (req, res) => {
    //console.log(req.body);
    User.create(req.body, (err) => {
        if (err) throw err;
        console.log(req.body);
        console.log("User Registered Successfully");
    })

});

//------------------LOgin-------------
//User Login
app.post('/login', (req, res) => {
    console.log(req.body);

    
});

/* app.post('/users/login', function (req, res) {
    console.log("This has run");
    console.log(req.body);
    User.find((err, data) => {
        
    var email = req.body.email;
    var password = req.body.password;
        if( err) throw err;
        data.forEach(user => {
            if (user.email == email && user.password == password){
                res.status(200).json({"found": "yes"});
                //res.redirect("/views/chat.html");
            } else {
                res.status(404).json({"found":"no"});
            }
        });

    })
}) */

//---------------------CHATS--------------------//
app.post('/chats', (req, res) => {
    console.log(req.body);
    Chat.create(req.body, (err) => {
        if (err) throw err;
        io.emit('chat', req.body);
        console.log('Chat saved in db Successfully');
    })
})

app.get('/chats', (req, res) => {
    Chat.find((err, chats) => {
        if (err) throw err;
        res.send(chats);
    })
})

//Http server running...
http.listen(3000, () => {
    console.log('Server is running at port 3000!!');
})
