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
  @Input() public user!: User;
  @Input() public isOpenSidebar = false;

  @Output() public event: EventEmitter<boolean> = new EventEmitter();
  
  public idUser?: number;
  
  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) { }
    
  ngOnInit(): void {
    this.idUser = this.userService.getIdUserLogged();
    this.idUser && this.getUserLocalData();
  }

  public clickedButton(): void {
    this.event.emit(true);
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

  public logout(): void {
    this.userService.removeIdUserLogged();
    this.loginService.removeLoggedUser();
    this.event.emit();
  }

  public get isLogged(): boolean {
    return this.loginService.loggedUserLocalData !== null ? this.loginService.loggedUserLocalData : false;
  }
}
