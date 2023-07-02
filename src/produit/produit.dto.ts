import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ProduitDto{
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}

export class CreateProduitDto {
  @IsNotEmpty()
  customerName: string;
  
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProduitDto)
  prod: ProduitDto[];
  }