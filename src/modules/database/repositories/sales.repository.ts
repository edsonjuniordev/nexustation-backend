import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { Prisma } from "@prisma/client"

@Injectable()
export class SalesRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createArgs: Prisma.SalesCreateArgs) {
    return this.prismaService.sales.create(createArgs)
  }

  findMany(findManyArgs: Prisma.SalesFindManyArgs) {
    return this.prismaService.sales.findMany(findManyArgs)
  }

  findUnique(findUniqueArgs: Prisma.SalesFindUniqueArgs) {
    return this.prismaService.sales.findUnique(findUniqueArgs)
  }

  update(updateArgs: Prisma.SalesUpdateArgs) {
    return this.prismaService.sales.update(updateArgs)
  }
}