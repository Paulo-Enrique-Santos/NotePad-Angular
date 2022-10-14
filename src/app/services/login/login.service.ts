import { Injectable } from '@angular/core';

import { BehaviorSubject } from'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isOpenSideBarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  public toggleSideBar(): void {
    this.isOpenSideBarSubject.next(this.isOpenSideBarSubject.value ? false : true);
    console.log('rodei essa função');
    console.log(this.isOpenSideBarSubject.value)
  }

  public getSideBarState(): BehaviorSubject<boolean> {
    return this.isOpenSideBarSubject;
  }

  public setLoggedUser(): void {
    localStorage.setItem('isLogged', JSON.stringify(true));
  }

  public get loggedUser(): boolean {
    return JSON.parse(localStorage.getItem('isLogged')!);
  }
}
