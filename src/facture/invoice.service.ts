// /*
// https://docs.nestjs.com/providers#services
// */

// import { Injectable } from '@nestjs/common';
// import { XmlBuilder } from './xml-builder';
// import { InvoiceDto } from './invoice.dto';

// @Injectable()
// export class InvoiceService {
//     generateInvoice(invoiceData: InvoiceDto) {
//         const xmlBuilder = new XmlBuilder(invoiceData);
//         const xml = xmlBuilder.buildXml();

//         return 'Facture generee avec succes';
//     }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prod } from './prod.entity';
import { CreateInvoiceDto } from './invoice.dto';

@Injectable()
export class InvoiceService {
  [x: string]: any;
  constructor(
    @InjectRepository(Prod)
    private productRepository: Repository<Prod>,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<string> {
    const { customerName, prod } = createInvoiceDto;

    // Logique de génération de la facture ici
    const invoiceNumber = this.generateInvoiceNumber();
    const currentDate = new Date().toLocaleDateString();
    const totalAmount = this.calculateTotalAmount(prod);
    const taxAmount = this.calculateTaxAmount(totalAmount);
    const grandTotal = totalAmount + taxAmount;

    // Construction de la facture
    const invoice = `
      --------------------------------------------------
      |                 FACTURE                            |
      --------------------------------------------------
      |                                                  |
      | Nom de l'entreprise                              |
      | Adresse de l'entreprise                          |
      | Numéro de téléphone                              |
      | Adresse e-mail                                   |
      | Site web                                         |
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Date : ${currentDate}                             |
      | Numéro de facture : ${invoiceNumber}               |
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Informations sur le client :                      |
      |                                                  |
      | Nom du client : ${customerName}                    |
      | Adresse du client :                              |
      | Ville, code postal                               |
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Désignation           |  Quantité  |  Prix unitaire |
      |-------------------------------------------------|
      ${this.formatProductRows(prod)}
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Total hors taxes :                ${totalAmount} Ariary       |
      | Taxe (20%) :                       ${taxAmount} Ariary       |
      |                                                  |
      | Total à payer :                   ${grandTotal} Ariary       |
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Mode de paiement :                               |
      |                                                  |
      | [Indiquer le mode de paiement convenu]           |
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Veuillez régler la somme due avant le             |
      | ${this.getDueDate()}                                 |
      |                                                  |
      | Merci de votre confiance et de votre              |
      | préférence pour notre entreprise.                 |
      |                                                  |
      --------------------------------------------------`;

    return invoice;
  }

  private generateInvoiceNumber(): string {
    // Logique de génération du numéro de facture
    return '00123';
  }

  private calculateTotalAmount(prod: Prod[]): number {
    // Logique de calcul du montant total hors taxes
    return prod.reduce((total, product) => total + product.quantity * product.price, 0);
  }

  private calculateTaxAmount(totalAmount: number): number {
    // Logique de calcul du montant de taxe
    return totalAmount * 0.2; // Supposons une taxe de 20%
  }

  private formatProductRows(prod: Prod[]): string {
    // Formatage des lignes de produits
    return prod
      .map(
        (prod) =>
          `| ${prod.name.padEnd(20)} |  ${prod.quantity.toString().padStart(9)} | ${prod.price.toString().padStart(13)} Ariary |`
      )
      .join('\n');
  }
}
