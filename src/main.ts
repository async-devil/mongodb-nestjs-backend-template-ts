import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

const port = process.env.PORT || 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Nestjs template")
		.setDescription("MongoDB Nestjs backend template ts")
		.setVersion("1.0.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api/docs", app, document);

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(port);

	Logger.log(`Server is started on http://localhost:${port}`, "NestApplication");
}

void bootstrap();
