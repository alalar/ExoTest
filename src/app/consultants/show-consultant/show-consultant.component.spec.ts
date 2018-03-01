import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import {TranslateModule,  TranslateLoader, TranslateFakeLoader} from '@ngx-translate/core'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ConsultantsService } from '../consultants.service';
import { Consultant } from '../../shared/consultant';
import { HidePanelsService } from '../hide-Panels.service';
import { ShowConsultantComponent } from './show-consultant.component';
import { CommentComponent } from '../comment/comment.component';



class HidePanelsServiceStub {

}

describe('ShowConsultantComponent', () => {
  let component: ShowConsultantComponent;
  let fixture: ComponentFixture<ShowConsultantComponent>;
  let google: any;
  let de: DebugElement;
  let element: HTMLElement;

  const mockConsultant: Consultant = 
          {id: 1,created: new Date(),modified: new Date(), uuid: "asdfadsf",
            email: "asdfasdf@asdf.es",short_name: "AA", full_name: "John Peter", 
            date_joined: new Date(), status: "A", gender: "F", short_me: "short_me", 
            location: "London", profile_picture: "XSXS", comments:[		
                    {id:1, created: new Date(), modified: new Date(), subject: "subject", 
                    body: "body", status: "A", rating: 4, user: "user", consultant:2},
                    {id:1, created: new Date(), modified: new Date(), subject: "subject", 
                    body: "body", status: "A", rating: 4, user: "user", consultant:2}
                ] 
          };
const consultantsService = jasmine.createSpyObj('ConsultantsService', ['getConsultant']);
let getConsultantSpy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [ ShowConsultantComponent, CommentComponent ],
      providers: [
        { provide: HidePanelsService, useClass: HidePanelsServiceStub },
        { provide: ConsultantsService, useValue: consultantsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConsultantComponent);
    component = fixture.componentInstance;

    // Make the spy return an async info
    getConsultantSpy = consultantsService.getConsultant.and.returnValue(Promise.resolve(mockConsultant) );

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the consultant after getconsultant promise resolves', async() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;   
   // getconsultant service is async, so we should not have any consultant info
    expect(compiled.querySelector('mat-card-subtitle')).toBe(null, "No contact info to show");
    expect(compiled.querySelector('mat-list-item')).toBe(null, "No comment info to show");
    fixture.whenStable().then( () => {
        //Now the getconsultans returns a value so we can see consultants info
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement; 
        expect(compiled.querySelector('mat-card-subtitle').textContent.trim()).toBe(mockConsultant.short_me, "We have the shortme info");
        expect(compiled.querySelectorAll('.comments > mat-list-item').length).toBe(mockConsultant.comments.length+1, "We have the right number of comments");
    });
  });
});
