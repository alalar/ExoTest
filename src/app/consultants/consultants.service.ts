import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Consultant } from '../shared/consultant';
import { Comment } from '../shared/comment';
 
@Injectable()
export class ConsultantsService {

  public url: string;
 
    constructor(
        public http: HttpClient
    ){
        this.url = "http://demopeople.exolever.com/api/";
    }
 
    getConsultants(): Observable<any>{
        return this.http.get(this.url+'consultants/');
    }
    getConsultant(id:string):Observable<any>{
        return this.http.get(this.url+'consultants/' + id + "/");
    }
 
  
    addComment(comment: Comment): Observable<any>{
        let json = JSON.stringify(comment);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this.http.post(this.url+'comment/', json, {headers: headers});
    }

}
