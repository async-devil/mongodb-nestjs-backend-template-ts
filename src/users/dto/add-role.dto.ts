import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class AddRoleDto {
	@IsString()
	@ApiProperty({ example: "admin" })
	readonly role: string;

	@IsString()
	@IsMongoId()
	@ApiProperty({ example: "619c1298f921003076701916" })
	readonly userId: string;
}
