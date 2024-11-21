import { Base } from '@root/common/entities/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';

@Entity()
export class User extends Base {
  @Column()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ nullable: true })
  public phone?: string;

  @Column({ nullable: true })
  public address?: string;

  @Column({ nullable: true })
  public profileImg?: string;

  @BeforeInsert()
  async beforeFunction() {
    // 패스워드 암호화
    const genSalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, genSalt);

    // 프로필 자동 생성
    this.profileImg = gravatar.url(this.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
      protocol: 'https',
    });
  }
}
