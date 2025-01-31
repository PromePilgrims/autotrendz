import { AppModule } from '@/app.module'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()
  app.use(helmet())
  await app.listen(3000)
}
bootstrap()
