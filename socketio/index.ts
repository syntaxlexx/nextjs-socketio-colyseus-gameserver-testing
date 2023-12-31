import express from "express"
import { createServer } from "http"
import { Server } from "socket.io";
import cors from "cors"
import { Message } from '@shared/types'

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors()); // Enable CORS for all routes

const messages: Message[] = [];

io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // send messages on connect to the new client
    socket.emit("messages", messages);

    // Listen for incoming messages
    socket.on("message", (message) => {
        console.log(`Received message from ${socket.id}:`, message);
        messages.push(message);

        // Broadcast the message to all connected clients
        io.emit("message", message);
    });

    socket.on("get-messages", (message) => {
        console.log(`sending all messages on request to ${socket.id}`);
        socket.emit("messages", messages);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`A user disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
