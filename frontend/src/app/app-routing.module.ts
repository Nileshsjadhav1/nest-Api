import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { IntegrationComponent } from './integration/integration.component';

const routes: Routes = [
  { path: '', component: IntegrationComponent },
  { path: 'integration', component: IntegrationComponent },
  { path: 'pdf-viewer', component: PdfViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
