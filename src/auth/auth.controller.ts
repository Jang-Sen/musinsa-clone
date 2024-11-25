import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { LocalGuard } from '@auth/guards/local.guard';
import { RequestUserInterface } from '@auth/interface/request-user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: '회원가입' })
  async signup(@Body() dto: CreateUserDto) {
    // const user = await this.authService.signup(dto);

    // 회원가입 시, 메일 전송
    // await this.authService.sendMailWithUser(dto.email);

    return await this.authService.signup(dto);
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: '로그인' })
  async login(@Req() req: RequestUserInterface) {
    const user = req.user;
    const token = this.authService.getAccessToken(user.id);

    return { user, token };
  }
}
