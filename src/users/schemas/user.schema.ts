import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

import { Role } from "../../roles/schemas/role.schema";

@Schema()
export class User {
	@ApiProperty({ example: "test@email.com" })
	@Prop({ required: true, unique: true })
	email: string;

	@ApiProperty({ example: "Password5@1" })
	@Prop({ required: true })
	password: string;

	@ApiProperty({ example: true })
	@Prop({ default: false })
	banned: boolean;

	@ApiProperty({ example: "Being rude", required: false })
	@Prop({ required: false })
	banReason: string;

	@ApiProperty({ example: "User" })
	@Prop({ type: [{ type: Types.ObjectId }], ref: Role.name })
	roles: Role[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
