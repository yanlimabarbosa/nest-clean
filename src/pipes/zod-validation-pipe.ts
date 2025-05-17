import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodSchema, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: fromZodError(error),
        })
      }
      throw new BadRequestException('Validation failed')
    }

    return value
  }
}
