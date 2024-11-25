import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { MailService } from '@mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  // 회원가입 로직
  async signup(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  // 로그인 로직
  async login(dto: LoginUserDto) {
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

  // 회원가입 후, 해당 유저에게 메일 보내는 로직
  async sendMailWithUser(email: string) {
    await this.mailService.sendMail({
      to: email,
      subject: '안녕하세요. 무신사 클론 입니다.',
      text: '무신사 클론에 가입해주셔서 감사합니다.',
    });
  }
}
