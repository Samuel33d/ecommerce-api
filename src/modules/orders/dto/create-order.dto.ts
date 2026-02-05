import { IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  shippingAddress: string;

  @IsString()
  shippingCity: string;

  @IsString()
  shippingCountry: string;

  @IsString()
  shippingZip: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
