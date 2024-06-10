import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  jsonData: any;


  constructor(private userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.userService.get()
      .subscribe(response => {
        this.jsonData = response;
        
        const doc = new jsPDF.default();
        const headers = [['Name', 'Email', 'Phone Number', 'Address']];
        const tableData = this.jsonData.map(item => [item.name, item.email, item.phoneNumber, item.address]);

        doc.autoTable({
          head: headers,
          body: tableData
        });
      const pdfBlob = doc.output('blob');
      this.savePdfToMongo(pdfBlob)
      const blobUrl = URL.createObjectURL(pdfBlob);

      this.pdfViewer.nativeElement.src = blobUrl;
    }, error => {
      console.log(error);
    });


  }
  download(){
    const doc = new jsPDF.default();
    const headers = [['Name', 'Email', 'Phone Number', 'Address']];
    const tableData = this.jsonData.map(item => [item.name, item.email, item.phoneNumber, item.address]);

    doc.autoTable({
      head: headers,
      body: tableData
    });
    doc.save('data.pdf');
  }
  backToHome(){
    this.router.navigate(['/integration']);
  }
  savePdfToMongo(pdfBlob: Blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = () => {
      const base64data = reader.result.toString().split(',')[1]; 
      const pdfData = {
        contentType: 'application/pdf',
        data: base64data
      };
      this.userService.savePdfToMongo(pdfData).subscribe(
        (response) => {
          console.log('PDF saved to MongoDB:', response._id);
          this.loadPdf(response._id)
        },
        (error) => {
          console.error('Error saving PDF to MongoDB:', error);
        }
      );
    };
  }
  loadPdf(pdfId: string): void {
    this.userService.getPdfById(pdfId).subscribe(
      (pdfBlob) => {
        console.log(pdfBlob)
        const blobUrl = URL.createObjectURL(pdfBlob);
        this.pdfViewer.nativeElement.src = blobUrl;
      },
      (error) => {
        console.error('Error loading PDF from MongoDB:', error);
      }
    );
  }
}

