import { Base } from '@root/common/entities/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { Provider } from '@user/entities/provider.enum';

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

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider?: Provider;

  @BeforeInsert()
  async beforeFunction() {
    try {
      // Local 로그인이 아닐 시, 비밀번호 암호화 및 프로필 생성 안함
      if (this.provider !== Provider.LOCAL) {
        return;
      } else {
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
    } catch (e) {
      console.log(e);
    }
  }
}
