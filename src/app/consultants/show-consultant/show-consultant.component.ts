import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Consultant } from '../../shared/consultant';
import { ConsultantsService } from '../consultants.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HidePanelsService }     from '../hide-Panels.service';
import 'rxjs/Rx';

declare const google: any;

@Component({
  selector: 'app-show-consultant',
  templateUrl: './show-consultant.component.html',
  styleUrls: ['./show-consultant.component.css']
})
export class ShowConsultantComponent implements OnInit {
  private consultant:Consultant;
  public blnLocationNotFound:boolean=false;
  private map:any;
  private marker:any;
  
  @Output() onHideConsultantInfo = new EventEmitter<boolean>();

  

  constructor( private consultantsService: ConsultantsService, 
        private route: ActivatedRoute,  
        private router: Router,
        private hidePanelsService:HidePanelsService) { }

  ngOnInit() {
    this.getConsultant();
  }
  getConsultant():void {
    this.consultant=null;
     (this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.consultantsService.getConsultant(params.get('id')))
        .subscribe(function(consultant) 
            { this.consultant=consultant;
              this.addMakerToMap(consultant.location);
            }.bind(this)));
      
  }
  transformToArray(value:number) {
    return new Array(value);
  }
  addMakerToMap(location:string) {
    window.scrollTo(0, 0);
    if (!this.map) {
      let mapProp = {
          center: new google.maps.LatLng(51.508742, -0.120850),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);   
    } 
      let geocoder = new google.maps.Geocoder();
        this.blnLocationNotFound = false;
        if (this.marker) {
          this.marker.setMap(null);
        }
        geocoder.geocode( { 'address': location}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK && results.length>0) {
            this.map.setCenter(results[0].geometry.location);
            this.marker = new google.maps.Marker({
                map: this.map,
                position: results[0].geometry.location
            });
          } else {
            this.blnLocationNotFound = true;
          }
        }.bind(this));
  }

}
