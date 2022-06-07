import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';


@NgModule({
  declarations: [],
  imports: [
    SharedLibsModule,
    ToastrModule.forRoot(),
  ],
  exports: [SharedLibsModule]
})
export class SharedModule { }
