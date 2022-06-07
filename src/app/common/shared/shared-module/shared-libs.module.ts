import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  exports: [
    FormsModule, 
    CommonModule, 
    NgbModule, 
    ReactiveFormsModule,
    NgxSpinnerModule
],
})
export class SharedLibsModule {}
