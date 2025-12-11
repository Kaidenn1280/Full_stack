import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // 👈 loads .env from the project root

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // your React app
  });

  await app.listen(3000);
}
bootstrap();
