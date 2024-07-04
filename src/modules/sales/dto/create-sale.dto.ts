import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from "class-validator";

export class Product {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateSaleDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Product)
  products: Product[]
}
