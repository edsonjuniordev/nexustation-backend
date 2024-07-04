import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { IsActiveUserId } from '../decorators/is.active.user.id';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto, @IsActiveUserId() userId: string) {
    return this.salesService.create(createSaleDto, userId);
  }

  @Get()
  findAll(@IsActiveUserId() userId: string) {
    return this.salesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @IsActiveUserId() userId: string) {
    return this.salesService.findOne(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
