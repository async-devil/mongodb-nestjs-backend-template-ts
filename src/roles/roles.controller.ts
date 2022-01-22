import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { HttpError } from "../errors.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RolesService } from "./roles.service";
import { Role } from "./schemas/role.schema";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@ApiOperation({ summary: "get role" })
	@ApiResponse({ status: 200, type: Role })
	@ApiResponse({ status: 404, type: HttpError, description: "Not found" })
	@Get(":value")
	getByValue(@Param("value") value: string): Promise<Role> {
		return this.rolesService.getRoleByValue(value);
	}

	@ApiOperation({ summary: "create role" })
	@ApiResponse({ status: 201, type: Role })
	@ApiResponse({ status: 409, type: HttpError, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpError, description: "Unauthorized" })
	@ApiBearerAuth()
	@Roles("admin")
	@UseGuards(RolesGuard)
	@Post()
	create(@Body() roleDto: CreateRoleDto): Promise<Role> {
		return this.rolesService.createRole(roleDto);
	}
}
