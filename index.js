const net = require('net');
const express = require('express');
const bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}); */

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    /* res.setHeader('Access-Control-Allow-Credentials', true); */

    // Pass to next layer of middleware
    next();
});

let client = new net.Socket();

app.post("/robot/forward", function(req, resp) {
    forward();
    resp.status(200).send('forward');
});
app.post("/robot/back", function(req, resp) {
    back();
    resp.status(200).send('back');
});
app.post("/robot/left", function(req, resp) {
    left();
    resp.status(200).send('left');
});
app.post("/robot/right", function(req, resp) {
    right();
    resp.status(200).send('right');
});
app.post("/robot/stop", function(req, resp) {
    stop();
    resp.status(200).send('stop');
});

app.listen(3001, function() {
    console.log('Listening on port 3001');
});





/* Functions */
function forward() {
    client.connect(9000, '192.168.1.46', function() {
        client.write("2");
    });
    client.on('data', function(data) {
        client.destroy();
    });
    client.on('close', function() {});
}

function left() {
    client.connect(9000, '192.168.1.46', function() {
        client.write("4");
    });
    client.on('data', function(data) {
        client.destroy();
    });
    client.on('close', function() {});
}

function right() {
    client.connect(9000, '192.168.1.46', function() {
        client.write("6");
    });
    client.on('data', function(data) {
        client.destroy();
    });
    client.on('close', function() {});
}

function back() {
    client.connect(9000, '192.168.1.46', function() {
        client.write("8");
    });
    client.on('data', function(data) {
        client.destroy();
    });
    client.on('close', function() {});
}

function stop() {
    client.connect(9000, '192.168.1.46', function() {
        client.write("5");
    });
    client.on('data', function(data) {
        client.destroy();
    });
    client.on('close', function() {});
}