import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes/notes.service';
import { UserService } from 'src/app/services/user/user.service';

import { Notes } from 'src/app/shared/models/notes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() public notesList: Notes[] = []; 

  public formNote!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.setValidatorsForm();
  }

  public createNewNote(): void {
    const idUser: number = this.userService.getIdUserLogged();

    const notes: Notes = {
      idUser: idUser === null ? 0 : idUser,
      title: this.formNote.value.title,
      describe: this.formNote.value.describe,
      content: this.formNote.value.content
    }

    this.notesService
      .createNote(notes)
      .subscribe(
        () => {
          this.formNote.reset();
          this.getNotesLocalData();
        }
      );
  }

  public getNotesLocalData(): void {
    const idUser: number = this.userService.getIdUserLogged() === null ? 0 : this.userService.getIdUserLogged();

    this.notesService
      .getNotesLocalData(idUser)
      .subscribe((res: Notes[]) => {
        this.notesList = res;
      });
  }

  private setValidatorsForm(): void {
    this.formNote = this.formBuilder.group({
      title: ['', [Validators.required]],
      describe: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }
}
