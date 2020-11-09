import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDialogModule,
  MatInputModule,
} from "@angular/material";

@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class AngularMaterialModule {}
