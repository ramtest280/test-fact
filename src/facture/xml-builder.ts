import { InvoiceDto } from "./invoice.dto";

export class XmlBuilder{
    constructor(private readonly invoiceData: InvoiceDto){}

    buildXml():string {
        const doc = new DOMParser().parseFromString('', 'application/xml');
        const xmlSer = new XMLSerializer();
        const xmlString = xmlSer.serializeToString(doc);
        return xmlString;

    }
}