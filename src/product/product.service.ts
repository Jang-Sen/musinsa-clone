import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '@product/dto/create-product.dto';
import { UpdateProductDto } from '@product/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  // 전체 조회 로직
  async findAll() {
    return await this.repository.find();
  }

  // Id로 조회 로직
  async findById(id: string) {
    const result = await this.repository.findOneBy({ id });

    if (!result) {
      throw new NotFoundException('제품이 존재하지 않습니다.');
    }

    return result;
  }

  // 생성 로직
  async create(dto: CreateProductDto) {
    const product = this.repository.create(dto);

    await this.repository.save(product);

    return product;
  }

  // 수정 로직
  async update(id: string, dto: UpdateProductDto) {
    const result = await this.repository.update(id, dto);

    if (!result) {
      throw new NotFoundException('수정할 제품이 존재하지 않습니다.');
    }

    return result;
  }

  // 삭제 로직
  async delete(id: string) {
    const result = await this.repository.delete(id);

    if (!result) {
      throw new NotFoundException('삭제할 제품이 존재하지 않습니다.');
    }

    return result;
  }
}
