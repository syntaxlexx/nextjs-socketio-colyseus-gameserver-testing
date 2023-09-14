import { Schema, ArraySchema, type } from "@colyseus/schema";
import { PlayerState } from "./PlayerState";
import { PrivateMessageState } from "./PrivateMessageState";

export class TwoPlayerRoomState extends Schema {
    @type("string") welcomeMessage: string = "DM Lobby";

    @type(PlayerState) player1 = new PlayerState();
    @type(PlayerState) player2 = new PlayerState();

    @type([PrivateMessageState]) messages = new ArraySchema<PrivateMessageState>();
}
