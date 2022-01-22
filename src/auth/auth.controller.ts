import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HttpError } from "../errors.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: "login user" })
	@ApiResponse({ status: 201, type: String, description: "JWT token" })
	@ApiResponse({ status: 404, type: HttpError, description: "Not found" })
	@Post("/login")
	login(@Body() userDto: CreateUserDto) {
		return this.authService.login(userDto);
	}

	@ApiOperation({ summary: "user registration" })
	@ApiResponse({ status: 201, type: String, description: "JWT token" })
	@ApiResponse({ status: 409, type: HttpError, description: "Duplicate error" })
	@Post("/registration")
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto);
	}
}
