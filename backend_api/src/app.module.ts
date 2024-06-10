import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PdfModule } from './pdf/pdf.module';
import { PdfController } from './pdf/pdf.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nilujadhav96:2pguuE1ujISgowGF@nestcluster.gw7eyxj.mongodb.net/users-record-db?retryWrites=true&w=majority&appName=nestcluster'),
    UsersModule,
    PdfModule
  ],
  controllers: [AppController,PdfController],
  providers: [AppService],
})
export class AppModule {}
// 2pguuE1ujISgowGF