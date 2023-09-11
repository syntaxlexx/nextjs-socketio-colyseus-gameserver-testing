import io from "socket.io-client";

const socketio = io(String(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL), {
    transports: ["websocket"],
});

export default socketio
