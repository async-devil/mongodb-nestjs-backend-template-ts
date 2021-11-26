import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ErrorsService } from "../errors.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.SECRET_KEY || "Secret key",
			signOptions: {
				expiresIn: "24h",
			},
		}),
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, ErrorsService],
})
export class AuthModule {}
