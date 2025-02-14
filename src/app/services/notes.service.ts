import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  firstValueFrom,
  map,
  Observable,
  throwError,
} from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseUrl = 'http://localhost:8000/note/v1/api/notes';
  constructor(private http: HttpClient) {}

  getAllNote(): Observable<Note[]> {
    const test = this.http
      .get<{ status: string; message: any[]; data: Note[] }>(this.baseUrl)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
    console.log(test);
    return test;
  }

  async createNote(data: any): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(this.baseUrl, data).pipe(
          catchError((error) => {
            console.error('Error saving note: ', error);
            return throwError(() => error);
          })
        )
      );
    } catch (error) {
      console.error('Error saving note: ', error);
      throw error;
    }
  }
  async updateNote(id: any, data: any): Promise<void> {
    try {
      await firstValueFrom(this.http.put(`${this.baseUrl}/${id}`, data));
    } catch (error) {
      console.error('Error updating note: ', error);
      throw error;
    }
  }

  async deleteNote(id: any): Promise<void> {
    try {
      console.log(id);
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
    } catch (error) {
      console.error('Error deleting note: ', error);
      throw error;
    }
  }
}
