import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as ejs from 'ejs';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.engine('ejs', ejs.renderFile);
  app.use(bodyParser.json()); // Middleware pour gérer les requêtes JSON
  app.use(bodyParser.urlencoded({ extended: true }));
  
  await app.listen(3000);
}
// bodyParser.json();
bootstrap();
