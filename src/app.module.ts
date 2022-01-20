import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";

const HOST = `${process.env.MONGO_HOST || "mongodb://localhost"}`;
const PORT = `${process.env.MONGO_PORT || "27017"}`;
const DB = `${process.env.MONGO_DB || ""}`;

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		MongooseModule.forRoot(`${HOST}:${PORT}/${DB}`),
		UsersModule,
		RolesModule,
		AuthModule,
	],
})
export class AppModule {}
