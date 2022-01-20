import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { ErrorsService } from "../errors.service";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly rolesService: RolesService,
		private readonly errorsService: ErrorsService
	) {}

	async getAllUsers(): Promise<User[]> {
		return this.userModel.find().populate("roles").exec();
	}

	async getUserById(id: string | ObjectId): Promise<User> {
		const user = await this.userModel.findById(id.toString()).populate("roles").exec();
		if (!user) this.errorsService.throwNotFoundError();

		return user;
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = await this.userModel.findOne({ email }).populate("roles").exec();
		if (!user) this.errorsService.throwNotFoundError();

		return user;
	}

	async createUser(userDto: CreateUserDto): Promise<User> {
		try {
			const user = new this.userModel(userDto);
			const role = await this.rolesService.getRoleByValue("user");

			user.$set("roles", [role.id]);

			await user.save();

			return user;
		} catch (err) {
			this.errorsService.checkDuplicationError(err as Error);
			this.errorsService.checkNotFoundError(err as Error);
			this.errorsService.throwDefaultError(err as Error);
		}
	}

	async removeUser(id: string | ObjectId): Promise<User> {
		return this.userModel.findByIdAndRemove(id.toString());
	}

	async updateUser(id: string | ObjectId, userDto: UpdateUserDto): Promise<User> {
		return this.userModel.findByIdAndUpdate(id.toString(), userDto);
	}

	async addRole(addRoleDto: AddRoleDto) {
		const user = await this.userModel.findById(addRoleDto.userId.toString()).exec();
		const role = await this.rolesService.getRoleByValue(addRoleDto.role);

		if (!user || !role) this.errorsService.throwNotFoundError();

		user.roles.push(role);

		await user.save();
	}

	async banUser(banUserDto: BanUserDto) {
		const user = await this.userModel.findById(banUserDto.userId.toString()).exec();

		if (!user) this.errorsService.throwNotFoundError();

		user.banned = true;
		user.banReason = banUserDto.banReason;

		await user.save();
	}
}
