import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note/note.service';
import { UserService } from 'src/app/services/user/user.service';

import { Note } from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() public noteList: Note[] = []; 

  public formNote!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.setValidatorsForm();
  }

  public createNewNote(): void {
    const idUser: number = this.userService.getIdUserLogged();

    const note: Note = {
      idUser: idUser === null ? 0 : idUser,
      title: this.formNote.value.title,
      describe: this.formNote.value.describe,
      content: this.formNote.value.content
    }

    this.noteService
      .createNote(note)
      .subscribe(
        () => {
          this.formNote.reset();
          this.getNoteList();
        }
      );
  }

  public selectUpdateNote(note: Note): void {
    console.log(note);
  }

  public createOrEditNote(): void {
    const idNote: number = this.noteService.getIdNoteLocalData();

    idNote !== null ? this.createNewNote() : this.updateNote(idNote);
  }

  public updateNote(idNote: number): void {

  }

  public getNoteList(): void {
    const idUser: number = this.userService.getIdUserLogged() === null ? 0 : this.userService.getIdUserLogged();

    this.noteService
      .getNoteListByIdUser(idUser)
      .subscribe((res: Note[]) => {
        this.noteList = res;
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
