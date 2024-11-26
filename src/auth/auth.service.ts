import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { MailService } from '@mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from '@auth/interface/token-payload.interface';
import { RequestUserInterface } from '@auth/interface/request-user.interface';
import { Provider } from '@user/entities/provider.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  // 회원가입 로직
  async signup(dto: CreateUserDto) {
    return await this.userService.create({ ...dto, provider: Provider.LOCAL });
  }

  // 로그인 검증 로직
  async loginValidate(dto: LoginUserDto) {
    const user = await this.userService.findBy('email', dto.email);

    const match = await bcrypt.compare(dto.password, user.password);

    if (!match) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  // 로그인 로직
  async login(req: RequestUserInterface) {
    const user = req.user;
    const token = this.getAccessToken(user.id);

    return { user, token };
  }

  // Access Token 발급 로직
  public getAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  // 회원가입 후, 해당 유저에게 메일 보내는 로직
  async sendMailWithUser(email: string) {
    await this.mailService.sendMail({
      to: email,
      subject: '안녕하세요. 무신사 클론 입니다.',
      text: '무신사 클론에 가입해주셔서 감사합니다.',
    });
  }
}
