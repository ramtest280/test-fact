import { Body, Controller, Get, Param, Post, Render, Req } from '@nestjs/common';
// import { ProduitService } from './produit.service';
import { CreateProduitDto } from './produit.dto';
import { ProduitService } from './produit.service';
import { Request, request } from 'express';
import { json } from 'body-parser';



@Controller('produit')
export class ProduitController {
    constructor(private readonly produitService: ProduitService) {}

    @Get('/form')
    @Render('form')
    getData() {}


    @Post('/submit')
    submitForm(@Req() request: Request) {
        
    }

    @Get('name')
    async getName(): Promise<any>{
    try {
      const jsonData = await this.produitService.readJSONFile();
      const nomclient = jsonData.nomclient;
      const modepaiement = jsonData.modepaiement;
      const prixUnitaire = jsonData.prixUnitaire;
      const produit = jsonData.produit;
      const qt = jsonData.qt;
      const numeroFacture = jsonData.numeroFacture


      const date = new Date().toLocaleDateString();

      const total = prixUnitaire * qt;
      const facture = `
        --------------------------------------------------
      |                 FACTURE         </br>                   |
      --------------------------------------------------
      |                                                  |
      | Nom de l'entreprise : SOA-K                             |
      | Adresse de l'entreprise                          |
      | Numéro de téléphone                                 |
      | Adresse e-mail                                      |
      | Site web                                            |
      |                                                     |
      --------------------------------------------------
      |                                                     |
      | Date : ${date}                                      |
      | Numéro de facture : ${numeroFacture}    </br>            |
      |                                                     |
      --------------------------------------------------
      |                                                     |
      | Informations sur le client :                        |
      |                                                     |
      | Nom du client : ${nomclient}                        |
      | Adresse du client :                                 |
      | Ville, code postal                                  |
      |                                                     |
      --------------------------------------------------
      |                                                     |
      | Désignation           |  Quantité  |  Prix unitaire |
      |-------------------------------------------------    |
      ${produit}              |      ${qt}      |   ${prixUnitaire}
      |                                                  |
      --------------------------------------------------
      |                                                  |
      |                                                  |
      |                                                  |
      |                                                  |
      | Total à payer :                   ${total} Ariary       |
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Mode de paiement :                               |
      |                                                  |
      | [Indiquer le mode de paiement convenu] 
      --------------------------------------------------
      |                                                  |
      | Veuillez régler la somme due avant le             |
      | ${date}                                 |
      |                                                  |
      | Merci de votre confiance et de votre              |
      | préférence pour notre entreprise.                 |
      |                                                  |
      --------------------------------------------------
      `
        return facture;
      // const nom = jsonData.hasOwnProperty('id');
    //   console.log()
      return facture;
      // console.log(jsonData)
    } catch (error) {
      console.log(error)
    }
  }

    // @Post()
    // createProduit(@Body() CreateProduitDto: CreateProduitDto): Promise<string>{
    //     return this.produitService.createProduit(CreateProduitDto.customerName, CreateProduitDto.prod);
    // }

    @Get('/test')
    testposting(){
        return this.produitService.getTest();
    }

    @Get(':invoiceNumber')
    getInvoice(@Param('invoiceNumber') invoiceNumber: string): Promise<string> {
        return this.produitService.getInvoice(invoiceNumber);
    } 



}
