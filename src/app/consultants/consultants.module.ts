import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantsService } from './consultants.service';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {TranslateModule} from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../shared/http-error.interceptor';
import { CommentComponent } from './comment/comment.component';
import { ConsultantsComponent } from './consultants.component';
import { ShowConsultantComponent } from './show-consultant/show-consultant.component';



@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forChild({})
  ],
  exports: [
    ConsultantsComponent
  ],
  declarations: [
    ConsultantsComponent,
    CommentComponent,
    ShowConsultantComponent],
  providers: [ConsultantsService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  }]
})
export class ConsultantsModule { 


}
