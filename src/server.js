require("./db/connection.js");

const express = require("express");
const userRouter = require("./user/userRouter.js");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.Port || 5001;
const socketPort = 5002;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// a variable for all the connected users
let users = [];
// on connect event add user to users array

io.on("connection", (socket) => {
    // add user to users array
    users[socket.id] = {
        socket_id: socket.id,
    };
    let user_id = Object.keys(users).length;
    // send message to client when connected
    io.emit("chat message", "Welcome to the chat");
    io.emit("chat message", "Type hi to get a response");
    io.emit("chat message", "Type get users to get a list of users");
    io.emit("chat message", `there is currently ${user_id} connected users`);
    // listen for messages from client
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
        // if message is hi, send hello back
        if (msg === "hi") {
            setTimeout(() => {
                io.emit("chat message", "hello from the server");
            }, 2000);
        }
        // if message is get users, send users back
        if (msg === "get users") {
            // socket.send(
            //     "users: " + users.map((user) => user.socket_id).join(", ")
            // );
            io.send();
            io.emit(
                "chat message",
                Object.keys(users).length + " users connected"
            );
            console.log(users);
            // console log an objects keys and values to a table
            console.table(
                Object.keys(users).map((key) => {
                    return users[key];
                })
            );
            // console log the number of keys in an object
            console.log(Object.keys(users).length);
        }
    });
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
        // remove user from users array
        io.emit("chat message", "user disconnected");
        delete users[socket.id];
    });
});

server.listen(socketPort, () => {
    console.log(`Socket.IO server running at http://localhost:${socketPort}/`);
});

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
