import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private loginResponseSubject = new BehaviorSubject<any>(null);
  loginResponse$ = this.loginResponseSubject.asObservable();

  constructor() {}

  setLoginResponse(response: any) {
    this.loginResponseSubject.next(response);
  }
}
