import { Client, Room, ServerError } from "@colyseus/core";
import { PrivateRoomState } from "./schema/PrivateRoomState";
import http from "http";
import { verifyJWT } from "@/lib/token";
import { PlayerState } from "./schema/PlayerState";
import { PrivateMessageState } from "./schema/PrivateMessageState";

export class PrivateRoom extends Room<PrivateRoomState> {
    maxClients = 3;

    onCreate(options: any) {
        this.setState(new PrivateRoomState());

        this.onMessage("message", (client, message: string) => {
            const player = this.getCurrentPlayer(client)

            const newMessage = new PrivateMessageState({
                message,
                username: player.username,
            })

            this.state.messages.push(newMessage)
            // broadcast a message to all clients
            this.broadcast("message", newMessage);
        });
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    async onAuth(client: Client, options: any, request: http.IncomingMessage) {
        try {
            const { id, username } = await verifyJWT<{ id: string, username: string }>(options.accessToken);

            return {
                id,
                username
            }
        } catch (error) {
            throw new ServerError(400, "bad access token");
        }

    }

    onJoin(client: Client, options: any, auth?: any) {
        console.log(client.sessionId, "joined!");
        const { id, username } = auth;

        this.state.players.set(client.sessionId, new PlayerState({
            id,
            username,
            sessionId: client.sessionId,
        }));

        // send them fresh copy of messages
        client.send('messages', this.state.messages)
    }

    async onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");

        // flag client as inactive for other users
        this.state.players.get(client.sessionId).connected = false;

        try {
            if (consented) {
                throw new Error("consented leave");
            }

            // allow disconnected client to reconnect into this room until 20 seconds
            await this.allowReconnection(client, 20);

            // client returned! let's re-activate it.
            this.state.players.get(client.sessionId).connected = true;

        } catch (e) {
            // 20 seconds expired. let's remove the client.
            this.state.players.delete(client.sessionId);
        }
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

    getCurrentPlayer(client: Client) {
        return this.state.players.get(client.sessionId)
    }

}
