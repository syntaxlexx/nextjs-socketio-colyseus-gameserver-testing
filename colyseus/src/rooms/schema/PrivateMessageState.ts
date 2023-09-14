import { Schema, ArraySchema, type } from "@colyseus/schema";

export class PrivateMessageState extends Schema {
    @type("string") message: string;
    @type("string") username: string;
}
