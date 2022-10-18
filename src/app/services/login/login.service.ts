import { Injectable } from '@angular/core';

import { BehaviorSubject } from'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isOpenSideBarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  public toggleSidebar(): void {
    this.isOpenSideBarSubject.next(this.isOpenSideBarSubject.value ? false : true);
  }

  public getSidebarState(): BehaviorSubject<boolean> {
    return this.isOpenSideBarSubject;
  }

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
