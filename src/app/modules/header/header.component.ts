import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoginService } from 'src/app/services/login/login.service';

import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  public user!: User;
  public idUser?: number;
  public isLogged: boolean = this.loginService.loggedUser;
  
  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) { }
    
  ngOnInit(): void {
    this.idUser = this.userService.getIdUserLogged();
    this.idUser && this.getUserLocalData();
  }

  public clickedButton(): void {
    this.loginService.toggleSideBar();
  }

  public getUserLocalData(): void {
    this.userService
    .getUserList(
      this.userService.getIdUserLogged()
    )
    .subscribe((res: Array<User>) => {
      this.user = res[0];
    });
  }

  public get isOpenSidebar(): boolean {
    return this.loginService.getSideBarState().value;
  }
}
