import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule,  TranslateLoader, TranslateFakeLoader} from '@ngx-translate/core'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultantsService } from '../consultants.service';

import { CommentComponent } from './comment.component';

class ConsultantsServiceStub {
  addComment() {}
}

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ],
      declarations: [ CommentComponent ],
      providers: [
        ConsultantsService,
        { provide: ConsultantsService, useClass: ConsultantsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validations', () => {
    //_store.next(_testState);
    

    let errors = {};

    expect(component.commentForm.valid).toEqual(false);
    
    //user min lenght is 3
    let control = component.commentForm.controls['user'];
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    control.setValue("12");
    errors = control.errors || {};
    expect(errors['minlength']).toBeTruthy();
    control.setValue("123");
    errors = control.errors || {};
    expect(Object.keys(errors).length==0).toBeTruthy();

    //subject min lenght is 5
    control = component.commentForm.controls['subject'];
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    control.setValue("1234");
    errors = control.errors || {};
    expect(errors['minlength']).toBeTruthy();
    control.setValue("12345");
    errors = control.errors || {};
    expect(Object.keys(errors).length==0).toBeTruthy();
    
    //body min lenght is 10
    control = component.commentForm.controls['body'];
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    control.setValue("123456789");
    errors = control.errors || {};
    expect(errors['minlength']).toBeTruthy();
    control.setValue("1234567890");
    errors = control.errors || {};
    expect(Object.keys(errors).length==0).toBeTruthy();

    expect(component.commentForm.valid).toBeTruthy();
  });
});
