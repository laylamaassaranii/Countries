import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateChangeService {
  private stateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  state$: Observable<string> = this.stateSubject.asObservable();

  constructor() {}

  // Method to update the state and notify subscribers
  updateState(newState: string): void {
    this.stateSubject.next(newState);
  }
}
