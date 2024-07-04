import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsActiveUserId } from '../decorators/is.active.user.id';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @IsActiveUserId() userId: string
  ) {
    return this.productService.create(createProductDto, userId);
  }

  @Get()
  findAll(@IsActiveUserId() userId: string) {
    return this.productService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @IsActiveUserId() userId: string) {
    return this.productService.findOne(id, userId);
  }

  @Get('barcode/:barCode')
  findOneByBarcode(@Param('barCode') barCode: string, @IsActiveUserId() userId: string) {
    return this.productService.findOneByBarcode(barCode, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @IsActiveUserId() userId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, userId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
