import { Body, Controller, Get, Res ,Post, Param, NotFoundException} from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import * as puppeteer from 'puppeteer';
@Controller('pdf')
export class PdfController {
    constructor(private readonly pdfService: PdfService) {}

    @Get()
    async getPdf(@Res() res: Response,@Body() user) {
        try {
            const pdfBuffer = await this.pdfService.generatePdf(user);
            res.setHeader('Content-Type', 'application/pdf',
                
            );
            res.send(pdfBuffer);
        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).send('Error generating PDF');
        }
    }
    @Post()
    async savePdfToMongo(@Body() pdfData: any): Promise<any> {
        const buffer = Buffer.from(pdfData.data,'base64'); 
        return await this.pdfService.savePdfToMongo({ contentType: pdfData.contentType, data: buffer });
    }
    @Get(':id')
    async getPdfById(@Param('id') id: string, @Res() res: Response): Promise<any> {
      const pdf = await this.pdfService.getPdfById(id);
      if (!pdf) {
        throw new NotFoundException('PDF not found');
      }
      res.setHeader('Content-Type', pdf.contentType);
      res.send(pdf.data);
    }
}
