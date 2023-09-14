import { Schema, ArraySchema, type, MapSchema } from "@colyseus/schema";
import { PlayerState } from "./PlayerState";
import { PrivateMessageState } from "./PrivateMessageState";

export class PrivateRoomState extends Schema {
    @type("string") welcomeMessage: string = "Private Lobby";

    @type({ map: PlayerState }) players = new MapSchema<PlayerState>();

    @type([PrivateMessageState]) messages = new ArraySchema<PrivateMessageState>();
}
