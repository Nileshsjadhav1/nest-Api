import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import Users, { userSchema } from  'src/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfSchema } from './pdf-schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Pdf', schema: PdfSchema }]),
    MongooseModule.forFeature([{name:Users.name, schema:userSchema}])
  ],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
