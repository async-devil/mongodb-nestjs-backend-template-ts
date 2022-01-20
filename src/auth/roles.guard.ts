import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

import { ErrorsService } from "../errors.service";
import { User } from "../users/schemas/user.schema";
import { IRequest } from "./IRequest.type";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly errorsService: ErrorsService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) return true;

		const req: IRequest = context.switchToHttp().getRequest();

		try {
			const authHeader: string = req.headers.authorization;
			const [bearer, token] = authHeader.split(" ");

			if (bearer !== "Bearer" || !token) {
				throw new Error("Invalid data");
			}

			const user: User = await this.jwtService.verifyAsync(token);

			req.user = user;

			return user.roles.some((role) => requiredRoles.includes(role.value));
		} catch (err) {
			this.errorsService.throwUnauthorizedError();
		}
	}
}
