import { Base } from '@root/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends Base {
  @Column()
  public username: string;

  @Column()
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
}
