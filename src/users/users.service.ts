import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { ErrorsService } from "../errors.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly errorsServise: ErrorsService
	) {}

	async getAllUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async getUserById(id: string | ObjectId): Promise<User> {
		const user = await this.userModel.findById(id.toString()).exec();
		if (!user) this.errorsServise.throwNotFoundError();
		return user;
	}

	async createUser(userDto: CreateUserDto): Promise<User> {
		try {
			const user = new this.userModel(userDto);
			await user.save();

			return user;
		} catch (err) {
			this.errorsServise.checkDuplicationError(err as Error);
			this.errorsServise.throwDefaultError(err as Error);
		}
	}

	async removeUser(id: string | ObjectId): Promise<User> {
		return this.userModel.findByIdAndRemove(id.toString());
	}

	async updateUser(id: string | ObjectId, userDto: UpdateUserDto): Promise<User> {
		return this.userModel.findByIdAndUpdate(id.toString(), userDto);
	}
}
