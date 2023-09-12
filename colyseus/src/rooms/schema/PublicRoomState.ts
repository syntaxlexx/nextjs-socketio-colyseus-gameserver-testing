import { Schema, ArraySchema, type } from "@colyseus/schema";

export class PublicRoomState extends Schema {

    @type("string") welcomeMessage: string = "Hello World";

    @type(["string"]) messages = new ArraySchema<string>();

}
