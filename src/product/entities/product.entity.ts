import { Base } from '@root/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends Base {
  @Column()
  public name: string;

  @Column()
  public price: number;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: true })
  public category?: string;

  @Column({ nullable: true })
  public productImg?: string;
}
