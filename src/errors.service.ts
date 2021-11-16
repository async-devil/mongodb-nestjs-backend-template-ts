import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class HttpError {
	@ApiProperty({ example: 404 })
	readonly status: number;

	@ApiProperty({ example: "Not found" })
	readonly message: string;
}

@Injectable()
export class ErrorsService {
	private readonly logger = new Logger(ErrorsService.name);

	checkDuplicationError(err: Error) {
		if (err.message.includes("E11000")) {
			throw new HttpException({ status: 409, message: "Duplicate error" }, HttpStatus.CONFLICT);
		}
	}

	throwDefaultError(err: Error) {
		throw new HttpException(
			{ status: 500, message: err.message },
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}

	throwNotFoundError() {
		throw new HttpException({ status: 404, message: "Not found" }, HttpStatus.NOT_FOUND);
	}
}
