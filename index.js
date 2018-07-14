var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {'pingInterval': 2000, 'pingTimeout': 10000});


app.use(express.static(__dirname + '/js'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/admin.html');
});

let imagePointer = 0;
let folders = [];

io.on('connection', function(socket) {
        // create client id, store it in array, and send it to client
        socket.on('getimage', function () {
            //socket.emit('sent id',socket.id);
        });

        socket.on('next', function(t) {
          console.log(`next - ${t}`);
          socket.emit('image','');
        });

        socket.on('prev', function(t) {
          console.log(`prev - ${t}`);
          socket.emit('image','');
        });

});

// create server on port 80
http.listen(80, function() {
    console.log('listening on *:80');
});
