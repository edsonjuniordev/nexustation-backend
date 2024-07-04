import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { Prisma } from "@prisma/client"

@Injectable()
export class ProductSalesRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createArgs: Prisma.ProductSalesCreateArgs) {
    return this.prismaService.productSales.create(createArgs)
  }

  findMany(findManyArgs: Prisma.ProductSalesFindManyArgs) {
    return this.prismaService.productSales.findMany(findManyArgs)
  }

  findUnique(findUniqueArgs: Prisma.ProductSalesFindUniqueArgs) {
    return this.prismaService.productSales.findUnique(findUniqueArgs)
  }

  update(updateArgs: Prisma.ProductSalesUpdateArgs) {
    return this.prismaService.productSales.update(updateArgs)
  }
}