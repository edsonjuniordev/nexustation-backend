import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesRepository } from '../database/repositories/sales.repository';
import { ProductRepository } from '../database/repositories/product.repository';
import { ProductSalesRepository } from '../database/repositories/product-sales.repository';

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly productRepository: ProductRepository,
  ) { }

  async create(createSaleDto: CreateSaleDto, userId: string) {
    const productsToResolve = createSaleDto.products.map((product) => this.productRepository.findUnique({
      where: {
        id: product.id,
        userId
      }
    }))

    const products = await Promise.all(productsToResolve)

    const saleAmount = products.reduce((acc, product, index) => {
      const productAmount = createSaleDto.products[index].quantity * product.value
      return acc += productAmount
    }, 0)

    const now = new Date().toISOString()

    return this.salesRepository.create({
      data: {
        userId,
        value: saleAmount,
        createdAt: now,
        updatedAt: now,
        productSales: {
          createMany: {
            data: products.map((product, index) => {
              const quantity = createSaleDto.products[index].quantity
              return {
                name: product.name,
                productId: product.id,
                quantity: quantity,
                value: product.value * quantity,
                createdAt: now,
                updatedAt: now
              }
            })
          }
        }
      }
    });
  }

  async findAll(userId: string) {
    const sales = await this.salesRepository.findMany({
      where: {
        userId
      }
    });

    return {
      sales
    }
  }

  findOne(id: string, userId: string) {
    return this.salesRepository.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        productSales: true
      }
    });
  }

  remove(id: string) {
    return `This action removes a #${id} sale`;
  }
}
