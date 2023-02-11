import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { PostgresExceptionCodes } from '../constants';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  protected readonly logger = new Logger(TypeOrmExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    let status: HttpStatus;
    let message: string;

    switch (exception.driverError?.code) {
      case PostgresExceptionCodes.UNIQUE_VIOLATION:
        message = exception.driverError.detail;
        status = HttpStatus.CONFLICT;
        break;

      case PostgresExceptionCodes.NOT_NULL_VIOLATION:
        message = `'${exception.driverError.column}' is missing`;
        status = HttpStatus.BAD_REQUEST;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Something went wrong';
        break;
    }

    this.logger.error(exception, message);

    res.status(status).json(HttpException.createBody('', message, status));
  }
}
