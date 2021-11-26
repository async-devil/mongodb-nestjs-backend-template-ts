import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
	@ApiProperty({ example: "Admin" })
	readonly value: string;
}
