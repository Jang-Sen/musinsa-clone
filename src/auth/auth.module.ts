import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { UserModule } from '@user/user.module';
import { MailModule } from '@mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@auth/strategies/local.strategy';

@Module({
  imports: [UserModule, JwtModule.register({}), MailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
