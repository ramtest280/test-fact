import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { json } from 'body-parser';


@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  



}
