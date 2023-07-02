import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from './invoice.service';
import { Prod } from './prod.entity';
import { InvoiceController } from './invoice.controller';

@Module({
  // controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
