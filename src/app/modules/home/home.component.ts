import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { UserService } from 'src/app/services/user/user.service';

import { Notes } from 'src/app/shared/models/notes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public notesListLocal: Notes[] = [];

  constructor(
    private notesService: NotesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public get notesList(): Notes[] {
    const idUser: number = this.userService.getIdUserLogged();

    this.notesService
    .getNotesForClients(idUser)
    .subscribe(
      (res: Array<Notes>) => this.notesListLocal = res
    )

    return this.notesListLocal;
  }
}
