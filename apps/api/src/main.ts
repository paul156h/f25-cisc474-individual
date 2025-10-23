import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appendFile } from 'fs';

import { config } from 'dotenv';
config();

console.log('AUTH0_ISSUER_URL:', process.env.AUTH0_ISSUER_URL);
console.log('AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "http://localhost:3001", 
      "https://cisc474-individual.paul156h.workers.dev",
    ],
  });
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
}

void bootstrap();


