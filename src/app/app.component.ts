import { Component, OnInit } from '@angular/core';

import { NotesService } from './services/notes/notes.service';
import { UserService } from './services/user/user.service';
import { Notes } from './shared/models/notes.model';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'NotePad-Angular';
  public notesList: Notes[] = [];
  public user!: User;

  public constructor (
    private notesService: NotesService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.getNotesLocalData();
  }

  public getNotesLocalData(): void {
    const idUser: number = this.userService.getIdUserLogged() === null ? 0 : this.userService.getIdUserLogged();

    idUser !== 0 && this.getUserLocalData();
    
    this.notesService
      .getNotesLocalData(idUser)
      .subscribe((res: Notes[]) => {
        this.notesList = res;
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
