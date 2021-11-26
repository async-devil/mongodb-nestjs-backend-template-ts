import { Injectable } from "@nestjs/common";

import { ErrorsService } from "../errors.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly errorsService: ErrorsService
	) {}

	public async login(userDto: CreateUserDto) {}

	public async registration(userDto: CreateUserDto) {}
}
