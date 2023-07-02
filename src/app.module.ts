import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProduitController } from './produit/produit.controller';
import { ProduitService } from './produit/produit.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // imports: [AppModule],
  imports: [MulterModule.register()],
  controllers: [AppController, ProduitController],
  providers: [AppService, ProduitService],
})
export class AppModule {}
