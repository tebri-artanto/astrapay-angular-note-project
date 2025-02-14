import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NotesService } from './notes.service';
import { Note } from '../models/note.model';

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8000/note/v1/api/notes';

  const mockNote: Note = {
    id: 1,
    title: 'Test Note',
    content: 'Content',
    createdDate: '2025-02-14T14:00:00Z',
    modifiedDate: '2025-02-14T18:00:00Z',
  };

  const mockResponse = {
    status: 'success',
    message: ['Note retrieved successfully'],
    data: [mockNote],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService],
    });
    service = TestBed.inject(NotesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllNote', () => {
    it('should get all notes', (done) => {
      service.getAllNote().subscribe({
        next: (notes) => {
          expect(notes).toEqual([mockNote]);
          expect(notes.length).toBe(1);
          done();
        },
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error when getting all notes', (done) => {
      service.getAllNote().subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
          done();
        },
      });

      const req = httpMock.expectOne(baseUrl);
      req.flush('Error fetching notes', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('createNote', () => {
    it('should create a new note ', async () => {
      const newNote = {
        title: 'Test Note',
        content: 'Content',
      };

      const promise = service.createNote(newNote);

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newNote);
      req.flush({ status: 'success' });

      await expectAsync(promise).toBeResolved();
    });

    it('should handle error when creating note', async () => {
      const newNote = {
        title: 'Test Note',
        content: 'Content',
      };

      const promise = service.createNote(newNote);

      const req = httpMock.expectOne(baseUrl);
      req.flush('Error creating notes', {
        status: 500,
        statusText: 'Internal Server Error',
      });
      await expectAsync(promise).toBeRejected();
    });
  });

  describe('updateNote', () => {
    it('should update  note ', async () => {
      const updatedNote = {
        title: 'Test Note',
        content: 'Content',
      };

      const id = 1;

      const promise = service.updateNote(id, updatedNote);

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedNote);
      req.flush({ status: 'success' });

      await expectAsync(promise).toBeResolved();
    });

    it('should handle error when updating note', async () => {
      const updatedNote = {
        title: 'Test Note',
        content: 'Content',
      };

      const id = 1;

      const promise = service.updateNote(id, updatedNote);

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      req.flush('Error updating notes', {
        status: 500,
        statusText: 'Internal Server Error',
      });
      await expectAsync(promise).toBeRejected();
    });
  });

  describe('deleteNote', () => {
    it('should delete note ', async () => {
      const id = 1;

      const promise = service.deleteNote(id);

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ status: 'success' });

      await expectAsync(promise).toBeResolved();
    });

    it('should handle error when deleting note', async () => {
      const id = 1;

      const promise = service.deleteNote(id);

      const req = httpMock.expectOne(`${baseUrl}/${id}`);
      req.flush('Error deleting notes', {
        status: 500,
        statusText: 'Internal Server Error',
      });
      await expectAsync(promise).toBeRejected();
    });
  });
});
