import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { ProductRepository } from './repositories/product.repository';
import { SalesRepository } from './repositories/sales.repository';

@Global()
@Module({
    providers: [PrismaService, UserRepository, ProductRepository, SalesRepository],
    exports: [PrismaService, UserRepository, ProductRepository, SalesRepository]
})
export class DatabaseModule { }
