import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { Prisma } from "@prisma/client"

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createArgs: Prisma.ProductCreateArgs) {
    return this.prismaService.product.create(createArgs)
  }

  findMany(findManyArgs: Prisma.ProductFindManyArgs) {
    return this.prismaService.product.findMany(findManyArgs)
  }

  findUnique(findUniqueArgs: Prisma.ProductFindUniqueArgs) {
    return this.prismaService.product.findUnique(findUniqueArgs)
  }

  update(updateArgs: Prisma.ProductUpdateArgs) {
    return this.prismaService.product.update(updateArgs)
  }
}