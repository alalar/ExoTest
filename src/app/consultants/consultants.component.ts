import { Component, OnInit } from '@angular/core';
import { Consultant } from '../shared/consultant';
import { ConsultantsService } from './consultants.service';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';
import { HidePanelsService }     from './hide-Panels.service';


@Component({
  selector: 'consultant-app',
  templateUrl: './consultants.component.html',
  styleUrls:['./consultants.component.css'],
  providers: [HidePanelsService]
})
export class ConsultantsComponent implements OnInit {

  public consultants : Observable<Consultant[]>;
  private showContactInfo:boolean=true;

  constructor(
    private translate: TranslateService, 
    private consultantsService: ConsultantsService,
    private hidePanelsService:HidePanelsService) { 
      hidePanelsService.changeView$.subscribe(
        show => {
          this.showContactInfo=show;
          console.log(show);
        });
    }

  ngOnInit() {
    this.getConsultants();
  }

  getConsultants(): void {
    this.consultants = this.consultantsService.getConsultants()
  }

  onHideConsultantInfo(showConsultant:boolean) {
    this.showContactInfo=showConsultant;
    
  }
}
