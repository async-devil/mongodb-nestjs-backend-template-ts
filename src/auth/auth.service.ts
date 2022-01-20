import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { ErrorsService } from "../errors.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/schemas/user.schema";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly errorsService: ErrorsService,
		private readonly jwtService: JwtService
	) {}

	public async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto);

		return this.generateToken(user);
	}

	public async registration(userDto: CreateUserDto): Promise<{ token: string }> {
		let candidate: User;
		try {
			candidate = await this.usersService.getUserByEmail(userDto.email);
		} catch (err) {
			//? 404 error must be in this situation
		} finally {
			if (candidate) this.errorsService.throwDuplicationError();
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5);

		const user = await this.usersService.createUser({ ...userDto, password: hashPassword });

		return this.generateToken(user);
	}

	private async generateToken(user: User): Promise<{ token: string }> {
		const payload = { email: user.email, roles: user.roles };

		return { token: this.jwtService.sign(payload) };
	}

	private async validateUser(userDto: CreateUserDto): Promise<User> {
		let user: User;

		try {
			user = await this.usersService.getUserByEmail(userDto.email);
		} catch (err) {
			this.errorsService.throwInvalidCredentialsError();
		}

		const passwordEquals = await bcrypt.compare(userDto.password, user.password);
		if (!passwordEquals) this.errorsService.throwInvalidCredentialsError();

		return user;
	}
}
