import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateChangeService {
  private stateSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  state$: Observable<any> = this.stateSubject.asObservable();

  constructor() {}

  // Method to update the state and notify subscribers
  updateState(newState: any): void {
    this.stateSubject.next(newState);
  }
}
