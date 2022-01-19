import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ErrorsService } from "../errors.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role, RoleDocument } from "./schemas/role.schema";

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
		private readonly errorsService: ErrorsService
	) {}

	async createRole(roleDto: CreateRoleDto) {
		try {
			const role = new this.roleModel({ ...roleDto, value: roleDto.value.toLowerCase() });
			await role.save();

			return role;
		} catch (err) {
			this.errorsService.checkDuplicationError(err as Error);
			this.errorsService.throwDefaultError(err as Error);
		}
	}

	async getRoleByValue(value: string) {
		const role = await this.roleModel.findOne({ value: value.toLowerCase() });
		if (!role) this.errorsService.throwNotFoundError();

		return role;
	}
}
