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

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
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
