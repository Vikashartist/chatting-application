const http = require("http");
const express = require("express");
const path = require('path');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// handling socket.io
io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        // console.log("A new usser message : ", message);
        io.emit("message", message);
    });
    console.log("A new user connected : ", socket.id);
});

app.use(express.static(path.resolve("./public")));
app.get('/', (req, res) => {
    return res.sendFile("/public/index.html");
});
server.listen(9000, () => console.log('server listening at port number : 90000'));