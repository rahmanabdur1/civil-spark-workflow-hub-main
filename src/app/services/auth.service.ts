import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  firstName: string;
  lastName: string;
  // Add other user properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  logout() {
    this.currentUserSubject.next(null);
  }
} 