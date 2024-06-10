
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private callMethodSource = new Subject<void>();

  callMethod$ = this.callMethodSource.asObservable();

  triggerCallMethod() {
    this.callMethodSource.next();
  }
}
