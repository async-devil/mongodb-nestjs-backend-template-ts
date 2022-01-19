import {
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	UnauthorizedException,
} from "@nestjs/common";
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

	private debugLog(message: unknown) {
		if (process.env.NODE_ENV !== "production") return this.logger.debug(message);
	}

	public checkDuplicationError(
		err: Error,
		callback: () => unknown | void = () => this.throwDuplicationError()
	) {
		if (err.message.includes("E11000")) {
			callback();
		}
	}

	public checkNotFoundError(
		err: Error,
		callback: () => unknown | void = () => this.throwNotFoundError()
	) {
		if (err.message.includes("Not found")) {
			callback();
		}
	}

	public throwDefaultError(err: Error) {
		this.debugLog(err);

		throw new HttpException(
			{ status: 500, message: err.message },
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}

	public throwNotFoundError() {
		throw new HttpException({ status: 404, message: "Not found" }, HttpStatus.NOT_FOUND);
	}

	public throwDuplicationError() {
		throw new HttpException({ status: 409, message: "Duplicate error" }, HttpStatus.CONFLICT);
	}

	public throwInvalidCredentialsError() {
		throw new UnauthorizedException({ status: 401, message: "Invalid credentials" });
	}

	public throwUnauthorizedError() {
		throw new UnauthorizedException({ status: 401, message: "Unauthorized" });
	}
}
