import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ErrorsService } from "../errors.service";
import { RolesModule } from "../roles/roles.module";
import { Role, RoleSchema } from "../roles/schemas/role.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
			{
				name: Role.name,
				schema: RoleSchema,
			},
		]),
		RolesModule,
	],
	controllers: [UsersController],
	providers: [UsersService, ErrorsService],
	exports: [UsersService],
})
export class UsersModule {}
