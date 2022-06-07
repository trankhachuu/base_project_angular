import { FormatDatePipe } from './../date/format-date.pipe';
import { FormatTimePipe } from './../date/format-time.pipe';
import { ControlMessagesComponent } from './../components/control-messages/control-messages.component';
import { AlertComponent } from './../components/alert/alert.component';
import { AlertErrorComponent } from './../components/alert-error/alert-error.component';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { SortDirective } from '../directive/sort.directive';
import { SortByDirective } from '../directive/sort-by.directive';


@NgModule({
  declarations: [
    AlertComponent,
    AlertErrorComponent,
    SortDirective,
    ControlMessagesComponent,
    FormatTimePipe,
    FormatDatePipe,
    SortByDirective
  ],
  exports: [
    SharedLibsModule,
    AlertComponent,
    AlertErrorComponent,
    SortDirective,
    ControlMessagesComponent,
    FormatTimePipe,
    FormatDatePipe,
    SortByDirective
  ],
  imports: [
    SharedLibsModule,
    ToastrModule.forRoot(),
  ]
})
export class SharedModule { }
