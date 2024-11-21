import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: '제품 이름',
    example: 'NJ1DQ75A 남성 1996 에코 눕시 자켓_BLACK',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    description: '제품 가격',
    example: 399000,
  })
  price: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '제품 설명',
    example: '노스페이스 패딩',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '제품 종류',
    example: '아우터',
  })
  category?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '제품 사진',
    example:
      'https://image.msscdn.net/thumbnails/images/goods_img/20220412/2482269/2482269_17210922117662_big.jpg?w=1200',
  })
  productImg?: string;
}
