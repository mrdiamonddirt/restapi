require("./db/connection.js");

const express = require("express");
const userRouter = require("./user/userRouter.js");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("a user connected");
});

server.listen(3000, () => {
    console.log("server started");
});

const port = process.env.Port || 5001;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
