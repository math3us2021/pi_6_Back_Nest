import { config } from 'dotenv';
config();// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs'; // Importe o módulo fs

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for your application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Gerar arquivo OpenAPI no formato YAML
  const yaml = require('js-yaml');
  const yamlString = yaml.dump(document);
  fs.writeFileSync('openapi.yaml', yamlString, 'utf8');

  // Gerar arquivo OpenAPI no formato JSON
  const jsonString = JSON.stringify(document, null, 2);
  fs.writeFileSync('openapi.json', jsonString, 'utf8');

  await app.listen(3000);
}
bootstrap();
