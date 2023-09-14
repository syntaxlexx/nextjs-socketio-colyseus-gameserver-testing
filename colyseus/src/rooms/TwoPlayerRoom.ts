import { Client, Room, ServerError } from "@colyseus/core";
import { TwoPlayerRoomState } from "./schema/TwoPlayerRoomState";
import http from "http";
import { verifyJWT } from "@/lib/token";
import { PlayerState } from "./schema/PlayerState";
import { PrivateMessageState } from "./schema/PrivateMessageState";

export class TwoPlayerRoom extends Room<TwoPlayerRoomState> {
    maxClients = 2;

    onCreate(options: any) {
        this.setState(new TwoPlayerRoomState());

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

        if (!this.state.player1.id && !this.state.player2.id) {
            this.state.player1 = new PlayerState({
                id,
                username,
                sessionId: client.sessionId,
                connected: true,
            })
        } else {
            // is either player1 or 2 now
            // NB: the room has a max of only 2 players
            const isPlayer1 = this.state.player1.id == id

            // if not player 1, then add to the list
            if (!isPlayer1) {
                this.state.player2 = new PlayerState({
                    id,
                    username,
                    sessionId: client.sessionId,
                    connected: true,
                })
            }
        }

        // send them fresh copy of messages
        client.send('messages', this.state.messages)
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

    getCurrentPlayer(client: Client) {
        return this.state.player1.sessionId == client.sessionId
            ? this.state.player1
            : this.state.player2
    }

}
