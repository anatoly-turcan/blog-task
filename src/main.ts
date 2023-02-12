import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Config } from './config/configuration';
import { PermissionGuard } from './role/guards/permission.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<Config>);
  const reflector = app.get(Reflector);
  const { port } = config.get<Config['app']>('app');

  app.enableShutdownHooks();
  app.enableCors();

  // Guards
  app.useGlobalGuards(
    new JwtAuthGuard(reflector),
    new PermissionGuard(reflector),
  );

  // DTO, validation, serialization, etc.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger
  const swagger = config.get<Config['swagger']>('swagger');
  const document = SwaggerModule.createDocument(app, swagger.config);
  SwaggerModule.setup(swagger.path, app, document);

  await app.listen(port);
}
bootstrap();
