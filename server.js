var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/* app.use(express.static(__dirname));
 */

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatsRouter = require('./routes/chats');

//Connect to Database
mongoose.connect('mongodb://localhost:27017/projectdb',
   { useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => { console.log('Connected To Database!!!'); })
   .catch((error) => { console.log(error); })

app.use('/users', usersRouter);
app.use('/chats', chatsRouter);
var http = require('http').Server(app);

http.listen(3000, () => {
    console.log('Server is running at port 3000!!');
})
