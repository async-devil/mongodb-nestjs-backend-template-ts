import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

import { HttpError } from "../errors.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: "get all users" })
	@ApiResponse({ status: 200, type: [User] })
	@Roles("admin")
	@UseGuards(RolesGuard)
	@Get()
	getAll(): Promise<User[]> {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: "get user by id" })
	@ApiResponse({ status: 200, type: User })
	@ApiResponse({ status: 404, type: HttpError, description: "Not found" })
	@Get(":id")
	getOne(@Param("id") id: string): Promise<User> {
		return this.usersService.getUserById(id);
	}

	@ApiOperation({ summary: "create user" })
	@ApiResponse({ status: 201, type: User })
	@ApiResponse({ status: 409, type: HttpError, description: "Duplicate error" })
	@Post()
	create(@Body() userDto: CreateUserDto): Promise<User> {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: "delete user by id" })
	@ApiResponse({ status: 201, type: User })
	@ApiResponse({ status: 404, type: HttpError, description: "Not found" })
	@Delete(":id")
	remove(@Param("id") id: string): Promise<User> {
		return this.usersService.removeUser(id);
	}

	@ApiOperation({ summary: "update user by id" })
	@ApiResponse({ status: 201, type: User })
	@ApiResponse({ status: 404, type: HttpError, description: "Not found" })
	@Put(":id")
	update(@Body() userDto: UpdateUserDto, @Param("id") id: string): Promise<User> {
		return this.usersService.updateUser(id, userDto);
	}

	@ApiOperation({ summary: "add role" })
	@ApiResponse({ status: 200 })
	@ApiResponse({ status: 404, type: HttpError, description: "Not found" })
	@Roles("admin")
	@UseGuards(RolesGuard)
	@Post("/role")
	addRole(@Body() addRoleDto: AddRoleDto) {
		return this.usersService.addRole(addRoleDto);
	}

	@ApiOperation({ summary: "ban user" })
	@ApiResponse({ status: 200 })
	@ApiResponse({ status: 404, type: HttpError, description: "Not found" })
	@Roles("admin")
	@UseGuards(RolesGuard)
	@Post("/ban")
	banUser(@Body() banUserDto: BanUserDto) {
		return this.usersService.banUser(banUserDto);
	}
}
