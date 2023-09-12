import { Room, Client } from "@colyseus/core";
import { PublicRoomState } from "./schema/PublicRoomState";

export class PublicRoom extends Room<PublicRoomState> {
    maxClients = 2;

    onCreate(options: any) {
        this.setState(new PublicRoomState());

        this.onMessage("message", (client, message) => {
            this.state.messages.push(message)
            // broadcast a message to all clients
            this.broadcast("message", message);
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        // send them fresh copy of messages
        client.send('messages', this.state.messages)
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
