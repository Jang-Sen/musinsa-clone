import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: '회원가입' })
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: '로그인' })
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
