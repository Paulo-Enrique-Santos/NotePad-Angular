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
    this.noteService.setIdNoteLocalData(note.id!);

    console.log(note.id);
    this.noteService
      .getNoteById(note.id!)
      .subscribe((res: Note[]) => {
        this.formNote.get('title')?.setValue(res[0].title);
        this.formNote.get('describe')?.setValue(res[0].describe);
        this.formNote.get('content')?.setValue(res[0].content);
      });
  }

  public createOrEditNote(): void {
    const idNote: number = this.noteService.getIdNoteLocalData();
    console.log(this.formNote.value)
    !idNote ? this.createNewNote() : this.updateNote(idNote);
  }

  public updateNote(idNote: number): void {
    const idUser: number = this.userService.getIdUserLogged();

    const note: Note = {
      idUser: !idUser ? 0 : idUser,
      title: this.formNote.value.title,
      describe: this.formNote.value.describe,
      content: this.formNote.value.content
    }

    this.noteService
      .updateNoteById(idNote, note)
      .subscribe(
        () => {
          this.formNote.reset();
          this.getNoteList();
          this.noteService.removeIdNoteLocalData();
        }
      );
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
