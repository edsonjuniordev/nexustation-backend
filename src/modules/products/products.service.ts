import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from '../database/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ) { }

  create(createProductDto: CreateProductDto, userId: string) {
    const now = new Date().toISOString()

    return this.productRepository.create({
      data: {
        userId,
        barCode: createProductDto.barCode,
        name: createProductDto.name,
        value: createProductDto.value,
        createdAt: now,
        updatedAt: now
      }
    });
  }

  async findAll(userId: string) {
    const products = await this.productRepository.findMany({
      where: {
        userId
      }
    });

    return {
      products
    }
  }

  findOne(id: string, userId: string) {
    return this.productRepository.findUnique({
      where: {
        id,
        userId
      }
    });
  }

  findOneByBarcode(barCode: string, userId: string) {
    return this.productRepository.findUnique({
      where: {
        barCode,
        userId
      }
    });
  }

  update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({
      where: {
        id,
        userId
      },
      data: {
        barCode: updateProductDto.barCode,
        value: updateProductDto.value,
        name: updateProductDto.name
      }
    });
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
