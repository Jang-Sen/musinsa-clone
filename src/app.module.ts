import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@db/db.module';
import { ProductModule } from '@product/product.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { MailModule } from '@mail/mail.module';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        MAIL_SERVICE: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),

        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),

      envFilePath: '.env',
      // ignoreEnvFile: true,
      isGlobal: true,
    }),
    DbModule,
    ProductModule,
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
