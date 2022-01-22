import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: unknown, metadata: ArgumentMetadata) {
		const obj = plainToClass(metadata.metatype, value) as object;
		const errors = await validate(obj);

		if (errors.length) {
			const messages = errors.map(
				(error) => `${error.property} - ${Object.values(error.constraints).join(", ")}`
			);

			throw new BadRequestException(messages);
		}

		return value;
	}
}
