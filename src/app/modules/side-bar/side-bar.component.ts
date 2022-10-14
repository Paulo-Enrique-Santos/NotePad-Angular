import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public isOpenRegister: boolean = false;
  public isOpenLogin: boolean = false;
  public incorrectEmails: boolean = false;
  public incorrectPassword: boolean = false;
  public incorrectLogin: boolean = false;
  public formRegister!: FormGroup;
  public formLogin!: FormGroup;
  public user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.setValidatorsForm();
  }

  public setOpenLogin(): void {
    this.isOpenLogin = true;
    this.isOpenRegister = false;
  }

  public setOpenRegister(): void {
    this.isOpenRegister = true;
    this.isOpenLogin = false;
  }

  public register(): void {
    if (this.formRegister.value.email !== this.formRegister.value.emailConfirmation) {
      this.incorrectEmails = true;
      return;
    } else if (this.formRegister.value.password !== this.formRegister.value.passwordConfirmation) {
      this.incorrectPassword = true;
      return;
    }
    
    this.user = {
      id: undefined,
      email: this.formRegister.value.email,
      name: this.formRegister.value.name,
      password: this.formRegister.value.password
    }

    this.incorrectPassword = false;
    this.incorrectEmails = false;

    this.userService
    .setRegisterUser(this.user)
    .subscribe(
      () => this.setOpenLogin(),
      () => console.log("Usuário não Cadastrado!")
    );
  }

  public login(): void {
    this.userService
    .getLoginUser(
      this.formLogin.value.email,
      this.formLogin.value.password
    ).subscribe(
      (res: Array<User>) => {
        const idUser: number = res[0].id!;

        if (!idUser) {
          this.incorrectLogin = true;
        } else {
          this.loginService.setLoggedUser();
          this.loginService.toggleSideBar();
          this.incorrectLogin = false;
          this.userService.setIdUserLogged(idUser);
        }
      }
    )
    
  }

  public setValidatorsForm(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      emailConfirmation: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]]
    });

    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public get isOpenSidebar(): boolean {
    return this.loginService.getSideBarState().value;
  }
}
