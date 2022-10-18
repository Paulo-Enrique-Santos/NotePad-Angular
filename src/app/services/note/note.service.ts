import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from 'src/app/shared/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly API_URL = "http://localhost:3000/note";

  constructor(
    private http: HttpClient
  ) { }

  public getNoteListByIdUser(
    idUser: number
  ): Observable<Note[]> {
    return this.http.get<Array<Note>>(`${this.API_URL}?idUser=${idUser}`);
  }

  public createNote(
    note: Note
  ): Observable<Note> {
    return this.http.post<Note>(this.API_URL, note);
  }

  public setIdNoteLocalData(idNote: number): void {
    localStorage.setItem('idNote', JSON.stringify(idNote));
  }

  public getIdNoteLocalData(): number {
    return JSON.parse(localStorage.getItem('idNote')!);
  }

  public removeIdNoteLocalData(): void {
    localStorage.removeItem('idNote');
  }
}
