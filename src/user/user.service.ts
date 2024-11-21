import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly repository: Repository<User>,
  ) {}

  // 생성 로직
  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    await this.repository.save(user);

    return user;
  }

  // id 또는 email로 회원 조회 로직
  async findBy(key: 'id' | 'email', value: string) {
    const user = await this.repository.findOneBy({ [key]: value });

    if (!user) {
      throw new NotFoundException(`${key} 에 맞는 회원이 존재하지 않습니다.`);
    }

    return user;
  }
}
