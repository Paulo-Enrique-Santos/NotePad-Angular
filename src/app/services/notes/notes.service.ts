import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Notes } from 'src/app/shared/models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly API_URL = "http://localhost:3000/notes";

  constructor(
    private http: HttpClient
  ) { }

  public getNotesForClients(
    idUser: number
  ): Observable<Notes[]> {
    return this.http.get<Array<Notes>>(`${this.API_URL}?idUser=${idUser}`);
  }
}