import { Injectable, NotFoundException } from '@nestjs/common';
import * as pdfkit from 'pdfkit';
import * as jsPDF from 'jspdf';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pdf } from './pdf-schema';
declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
  }
@Injectable()
export class PdfService {
    constructor(@InjectModel('Pdf') private readonly pdfModel: Model<any>) {}
    async generatePdf(user): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit();
            console.log(user)
            doc.text('Title: This is Dynamic data on the basis of table')
            const styles = {
                header: { fontSize: 18, bold: true, underline: true },
                text: { fontSize: 12, margin: 10 },
            };
            user.forEach((user, index) => {
                doc.font('Helvetica-Bold');
                doc.text(`User ${index + 1}:`, styles.header);
                doc.font('Helvetica');
                doc.text(`Name: ${user.name}`);
                doc.text(`Email: ${user.email}`);
                doc.text(`Phone Number: ${user.phoneNumber}`);
                doc.text(`Address: ${user.address}`);
                doc.moveDown(); 
            });
            const buffers: Buffer[] = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });
            doc.end();
        });
    }
    async generateAndSavePdf(userData: any): Promise<any> {
        console.log(userData)
        const doc = new jsPDF.default();
        const headers = [['Name', 'Email', 'Phone Number', 'Address']];
        const tableData = userData.map(item => [item.name, item.email, item.phoneNumber, item.address]);
    
        doc.autoTable({
          head: headers,
          body: tableData
        });
    
        const pdfBlob = doc.output('blob');
        const pdfBuffer = await pdfBlob.arrayBuffer(); 
        const pdfData = new Uint8Array(pdfBuffer);
    
        const pdfDoc = {
          data: pdfData,
          contentType: 'application/pdf',
        };
    
        const createdPdf = new this.pdfModel(pdfDoc);
        return await createdPdf.save();
      }
      async savePdfToMongo(pdfData: any): Promise<any> {
        const createdPdf = new this.pdfModel(pdfData);
        return await createdPdf.save();
      }
      async getPdfById(id: string): Promise<Pdf> {
        const pdf = await this.pdfModel.findById(id).exec();
        if (!pdf) {
          throw new NotFoundException('PDF not found');
        }
        return pdf;
      }
}
