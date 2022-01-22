import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

import { IsPassword } from "../../pipes/IsPassword.decorator";

export class UpdateUserDto {
	@IsString()
	@IsEmail()
	@ApiProperty({ example: "test@email.com" })
	readonly email: string;

	@IsString()
	@Length(6, 20)
	@IsPassword()
	@ApiProperty({ example: "Password5@1" })
	readonly password: string;
}
