import { Body, Injectable } from '@nestjs/common';
import { CreateProduitDto, ProduitDto } from './produit.dto';
import { Prod } from 'src/facture/prod.entity';
import * as fs from 'fs';

@Injectable()
export class ProduitService {

  async readJSONFile(): Promise<any>{
    return new Promise((resolve, reject) => {
      fs.readFile('data.json', 'utf-8', (err, data) => {
        if(err){
          reject(err);
        } else{
          try{
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch(err){
            reject(err)
          }
        }
      })
    })
  }
  FindAll(body: any): string {
    return body;
  }
    [x: string]: any;
    async createProduit(createProduitDto: CreateProduitDto): Promise<string>{
        const { customerName, prod} = createProduitDto;
        // const { name } = ProduitDto;

        const numeroFacture = this.genererNumeroFacture();
        const date = new Date().toLocaleDateString();
        const total = this.calculTotal(prod);
        
        const facture = `
        --------------------------------------------------
      |                 FACTURE                            |
      --------------------------------------------------
      |                                                  |
      | Nom de l'entreprise                              |
      | Adresse de l'entreprise                          |
      | Numéro de téléphone                            |
      | Adresse e-mail                                   |
      | Site web                                         |
      |                                                  |
      --------------------------------------------------
      |                                                  |
      | Date : ${date}                             |
      | Numéro de facture : ${numeroFacture}               |
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
      | ${this.getDueDate()}                                 |
      |                                                  |
      | Merci de votre confiance et de votre              |
      | préférence pour notre entreprise.                 |
      |                                                  |
      --------------------------------------------------
      `
        return facture;
    }
    
    
    private genererNumeroFacture() {
        return '00123';;
    }

    private calculTotal(prod: Prod[]): number {
        return prod.reduce((total, produit) => total + produit.quantity * produit.price, 0)
    }

    private formatProductRows(prod: Prod[]): string {
        return prod
          .map(
            (prod) =>
              `| ${prod.name.padEnd(20)} |  ${prod.quantity.toString().padStart(9)} | ${prod.price.toString().padStart(13)} Ariary |`
          )
          .join('\n');
      }

      getTest(): string{
        const numeroFacture = this.genererNumeroFacture();
        const date = new Date().toLocaleDateString();
        // const total = this.calculTotal();
        const test = `-------TEST-------
          <h1> Test</h1>
          ${date}
          ${numeroFacture}
          <input type="email"><br>
          <button type="submit">Valider</button>
        `;

        
        return test;
      }

      
}

