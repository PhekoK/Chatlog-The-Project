var express = require('express');
var app = express();
var path = require('path');


var http = require('http').Server(app);

//app.use(express.static(path.join(__dirname, '/registration')));
app.use(express.static(__dirname));


http.listen(3000, () => {
    console.log('Server is running at port 3000!!');
})
