import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { UserModule } from '@user/user.module';
import { MailModule } from '@mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { GoogleStrategy } from '@auth/strategies/google.strategy';
import { KakaoStrategy } from '@auth/strategies/kakao.strategy';
import { NaverStrategy } from '@auth/strategies/naver.strategy';

@Module({
  imports: [UserModule, JwtModule.register({}), MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    KakaoStrategy,
    NaverStrategy,
  ],
})
export class AuthModule {}
