const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {'pingInterval': 2000, 'pingTimeout': 10000});

const config = require("./config.json");
const fs = require("fs");

app.use(express.static(__dirname + '/js'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/admin.html');
});


app.get('/input', function(req, res) {
    res.sendFile(__dirname + '/input');
});

let imagePointer = 0;

io.on('connection', function(socket) {
        let files=[];
        // create client id, store it in array, and send it to client
        socket.on('getimage', function () {
            //socket.emit('sent id',socket.id);
            socket.emit('folders',config.folders);
        });

        socket.on('next', function(t) {
          console.log(`next - ${t}`);
          socket.emit('image','');
        });

        socket.on('prev', function(t) {
          console.log(`prev - ${t}`);
          socket.emit('image','');
        });

        socket.on('init', function() {
            console.log('reading files');
            let files = fs.readdirSync(config.input);
            fs.readFile(config.input + '1.JPG', function(err, buf){
                // it's possible to embed binary data
                // within arbitrarily-complex objects
                console.log(buf);
                io.emit('image', { image: true, buffer: buf });
                console.log('image file is initialized');
              });
            //console.log(`files - ${files}`);
            //io.emit('image',config.input+files[0]);
        });
});

// create server on port 80
http.listen(80, function() {
    console.log('listening on *:80');
});
