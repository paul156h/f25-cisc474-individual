import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appendFile } from 'fs';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3001", "https://cisc474-individual.paul156h.workers.dev/assignments"]
  });
  const port = 3000;
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
}

void bootstrap();


