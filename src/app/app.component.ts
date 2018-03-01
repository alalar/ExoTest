import { Component, LOCALE_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService,
      @Inject(LOCALE_ID) private localLanguage: string,
      ) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang(this.localLanguage);
        //we get the browser language
        let browserLang = translate.getBrowserLang();
        this.localLanguage = browserLang.match(/es/) ? 'es' : 'en';
    
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(this.localLanguage);
      }

    switchLanguage(language:string) {
      this.localLanguage = language;
      this.translate.use(this.localLanguage);
    }

}
