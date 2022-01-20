import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ErrorsService } from "../errors.service";
import { User } from "../users/schemas/user.schema";
import { IRequest } from "./IRequest.type";

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly errorsService: ErrorsService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: IRequest = context.switchToHttp().getRequest();

		try {
			const authHeader: string = req.headers.authorization;
			const [bearer, token] = authHeader.split(" ");

			if (bearer !== "Bearer" || !token) {
				throw new Error("Invalid data");
			}

			const user: User = await this.jwtService.verifyAsync(token);

			req.user = user;

			return true;
		} catch (err) {
			this.errorsService.throwUnauthorizedError();
		}
	}
}
