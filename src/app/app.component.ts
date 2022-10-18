import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { NoteService } from './services/note/note.service';
import { UserService } from './services/user/user.service';
import { Note } from './shared/models/note.model';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'NotePad-Angular';
  public noteList: Note[] = [];
  public user!: User;
  public isOpenSidebar: boolean = false;

  public constructor (
    private noteService: NoteService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.getNoteList();
  }

  public toggleSidebar(menuSidebar: MatSidenav): void {
    if (menuSidebar.opened) {
      this.isOpenSidebar = false;
      menuSidebar.close();
    } else {
      this.isOpenSidebar = true;
      menuSidebar.open();
    }
  }

  public getNoteList(): void {
    const idUser: number = this.userService.getIdUserLogged() === null ? 0 : this.userService.getIdUserLogged();

    idUser !== 0 && this.getUserLocalData();
    
    this.noteService
      .getNoteListByIdUser(idUser)
      .subscribe((res: Note[]) => {
        this.noteList = res;
      });
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
}
