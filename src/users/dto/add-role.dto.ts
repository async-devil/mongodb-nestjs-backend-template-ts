import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
	@ApiProperty({ example: "admin" })
	readonly role: string;

	@ApiProperty({ example: "619c1298f921003076701916" })
	readonly userId: string;
}
