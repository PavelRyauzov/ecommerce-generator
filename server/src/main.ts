import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  const prismaService = app.get(PrismaService, { strict: false });
  await prismaService.enableShutdownHooks(app);

  await app.listen(port || 4200, () => {
    console.log(`Server started on port: ${port}`);
  });
}

bootstrap();
