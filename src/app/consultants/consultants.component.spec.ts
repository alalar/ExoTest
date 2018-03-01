import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import {TranslateModule,  TranslateLoader, TranslateFakeLoader} from '@ngx-translate/core'; 
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

import { Consultant } from '../shared/consultant';
import { ConsultantsComponent } from './consultants.component';
import { ConsultantsService } from './consultants.service';

describe('ConsultantsComponent', () => {

  let component: ConsultantsComponent;
  let fixture: ComponentFixture<ConsultantsComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  const mockConsultants: Consultant[] = [
    {id: 1,created: new Date(),modified: new Date(), uuid: "asdfadsf",
      email: "asdfasdf@asdf.es",short_name: "AA", full_name: "John Peter", 
      date_joined: new Date(), status: "A", gender: "F", short_me: "SW", 
      location: "London", profile_picture: "XSXS", comments:[] 
    },
    {id: 2,created: new Date(),modified: new Date(), uuid: "asdfadsf",
      email: "asdfasdf@asdf.es",short_name: "AA", full_name: "John Peter", 
      date_joined: new Date(), status: "A", gender: "F", short_me: "SW", 
      location: "London", profile_picture: "XSXS", comments:[] 
    }
  ];
  const consultantsService = jasmine.createSpyObj('ConsultantsService', ['getConsultants']);
  let getConsultantsSpy;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [ ConsultantsComponent ],
      providers: [
        { provide: ConsultantsService, useValue: consultantsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantsComponent);
    component = fixture.componentInstance;

    // Make the spy return an async data
    getConsultantsSpy = consultantsService.getConsultants.and.returnValue( Promise.resolve(mockConsultants) );  
    
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the consultants after getconsultants promise resolves', async() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement; 
    de = fixture.debugElement.query(By.css('.userList'));
    element  = de.nativeElement;
     // getconsultants service is async, so we should not have any consultants info
    expect(element.querySelectorAll(".mat-list-item .mat-spinner").length).toBe(1, "Showing Loading page");
    fixture.whenStable().then( () => {
        //Now the getconsultans returns a value so we can see consultants info
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.userList'));
        element  = de.nativeElement;    
        console.log(element.querySelectorAll(".mat-list-item .mat-spinner"));    
        expect(element.querySelectorAll(".mat-list-item .mat-spinner").length).toBe(0, "Not Showing Loading page");
        expect(element.querySelectorAll(".mat-list-item").length).toBe(mockConsultants.length, "Showing consultants");
    });
  })






});
