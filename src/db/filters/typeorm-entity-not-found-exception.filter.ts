import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class TypeOrmEntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const notFound = new NotFoundException();

    res.status(notFound.getStatus()).json(notFound.getResponse());
  }
}
