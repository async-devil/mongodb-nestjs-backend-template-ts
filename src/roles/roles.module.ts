import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ErrorsService } from "../errors.service";
import { User, UserSchema } from "../users/schemas/user.schema";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { Role, RoleSchema } from "./schemas/role.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Role.name,
				schema: RoleSchema,
			},
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [RolesController],
	providers: [RolesService, ErrorsService],
	exports: [RolesService],
})
export class RolesModule {}
