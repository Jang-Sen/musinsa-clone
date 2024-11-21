import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '@product/product.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '@product/dto/create-product.dto';
import { UpdateProductDto } from '@product/dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  @ApiOperation({ summary: '전체 제품 조회' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: '제품 ID', example: '' })
  @ApiOperation({ summary: 'id에 맞는 제품 조회' })
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ summary: '제품 생성' })
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: '제품 ID', example: '' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOperation({ summary: '제품 수정' })
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return await this.productService.update(id, dto);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: '제품 ID', example: '' })
  @ApiOperation({ summary: '제품 삭제' })
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
