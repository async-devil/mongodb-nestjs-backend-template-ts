import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
	@ApiProperty({ example: "Being rude" })
	readonly banReason: string;

	@ApiProperty({ example: "619c1298f921003076701916" })
	readonly userId: string;
}
