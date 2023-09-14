import { Schema, ArraySchema, type } from "@colyseus/schema";

export class PlayerState extends Schema {
    @type("string") sessionId: string;
    @type("string") id: string;
    @type("string") username: string;
    @type("boolean") connected: boolean = false;
}
