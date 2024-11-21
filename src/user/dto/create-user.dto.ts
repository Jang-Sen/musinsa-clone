import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    description: '사용자 이메일',
    example: 'dh789521@gmail.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '사용자 비밀번호',
    example: '123456a!',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '사용자 휴대전화',
    example: '010-9511-0662',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '사용자 주소',
    example: '서울시 노원구',
  })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '사용자 프로필 사진',
    example:
      'https://s.gravatar.com/avatar/f70f5913e9db6b25d34122327b3117ae?s=200&r=pg&d=mm',
  })
  profileImg?: string;
}
