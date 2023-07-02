import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './invoice.dto';


@Controller('facture')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
    @Post()
    createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<string>{
        return this.invoiceService.generateInvoice(createInvoiceDto.customerName, createInvoiceDto.prod);
    }
    
    @Get(':invoiceNumber')
    getInvoice(@Param('invoiceNumber') invoiceNumber: string): Promise<string> {
        return this.invoiceService.getInvoice(invoiceNumber);
    }  
    
    @Get('list')
    Recup(): string{
        return 'Liste d\'article'
    }

    @Post('post')
    Post(): string{
        return 'Post en cours'
    }
}


