import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsActiveUserId } from '../decorators/is.active.user.id';
import { GetProductByBarcodQueryDto } from './dto/get-product-by-barcode.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

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
  findOneByBarcodeAndSum(@Param('barCode') barCode: string, @IsActiveUserId() userId: string, @Query() query: GetProductByBarcodQueryDto) {
    return this.productService.findOneByBarcodeAndSum(barCode, userId, query);
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
