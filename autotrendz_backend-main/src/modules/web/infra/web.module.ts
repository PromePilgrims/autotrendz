import { EmailService, RecaptchaService } from '@/modules/web/infra'
import { ContactEntity, ContactRepository } from '@/modules/web/infra/database'
import { WebController } from '@/modules/web/application/controllers'
import { WebAuthMiddleware } from '@/modules/web/application/middlewares'

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity]),
    HttpModule.register({ timeout: 5000 }),
  ],
  controllers: [WebController],
  providers: [ContactRepository, RecaptchaService, EmailService],
})
export class WebModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WebAuthMiddleware).forRoutes('web')
  }
}
