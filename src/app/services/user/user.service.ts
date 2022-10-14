import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = "http://localhost:3000/user";

  constructor(
    private http: HttpClient
  ) { }

  public getUserList(idUser: number): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.API_URL}?id=${idUser}`);
  }

  public getLoginUser(
    email: string,
    senha: string
  ): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.API_URL}?email=${email}&senha=${senha}`);
  }

  public setRegisterUser(
    user: User
  ): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }

  public getIdUserLogged(): number {
    return JSON.parse(localStorage.getItem('idUser')!);
  }

  public setIdUserLogged(idUser: number): void {
    localStorage.setItem('idUser', JSON.stringify(idUser));
  }

  public removeIdUserLogged(): void {
    localStorage.removeItem('idUser');
  }
}
