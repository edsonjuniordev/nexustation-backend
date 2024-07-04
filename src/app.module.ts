import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProductsModule, SalesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],
})
export class AppModule { }
