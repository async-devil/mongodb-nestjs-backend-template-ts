import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ErrorsService } from "../errors.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.SECRET_KEY || "SECRET_KEY",
			signOptions: {
				expiresIn: "2d",
			},
		}),
		forwardRef(() => UsersModule),
	],
	controllers: [AuthController],
	providers: [AuthService, ErrorsService],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
