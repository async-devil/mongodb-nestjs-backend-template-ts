import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({ example: "test@email.com" })
	readonly email: string;

	@ApiProperty({ example: "Password5@1" })
	readonly password: string;
}
