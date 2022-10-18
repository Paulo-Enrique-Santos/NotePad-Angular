import { Injectable } from '@angular/core';

import { BehaviorSubject } from'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public setLoggedUserLocalData(): void {
    localStorage.setItem('isLogged', JSON.stringify(true));
  }

  public get loggedUserLocalData(): boolean {
    return JSON.parse(localStorage.getItem('isLogged')!);
  }

  public removeLoggedUser(): void {
    localStorage.removeItem('isLogged');
  }
}
