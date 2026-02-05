import { IsString, IsNumber, Min } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
