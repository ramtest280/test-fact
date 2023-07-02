import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit.entity';
import { AppController } from 'src/app.controller';

@Module({
  // imports:[TypeOrmModule.forFeature([Produit]), ProduitModule],
  controllers: [ProduitController],
  providers: [ProduitService]
})
export class ProduitModule {}
