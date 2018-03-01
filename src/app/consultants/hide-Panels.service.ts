import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HidePanelsService {
  // Observable string sources
  private emitChangeView = new Subject<boolean>();
  // Observable string streams
  changeView$ = this.emitChangeView.asObservable();
  // Service message commands
  emitChange(change: boolean) {
      this.emitChangeView.next(change);
  }

}
