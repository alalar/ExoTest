import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConsultantsModule } from './consultants/consultants.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';   
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {of} from 'rxjs/observable/of';

let translations: any = {"TEST": "This is a test"};
class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of(translations);
    }
}
describe('Exo App', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        //RouterTestingModule
        MaterialModule,
        ConsultantsModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        }),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*it(`should have as locallanguage 'en'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.switchLanguage('en');
    expect(app.localLanguage).toEqual('en');
  }));*/
});
