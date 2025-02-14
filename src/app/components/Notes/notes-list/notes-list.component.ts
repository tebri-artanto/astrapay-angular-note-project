import { Component, OnInit,} from '@angular/core';
import { NotesService } from '../../../services/notes.service';
import { Note } from '../../../models/note.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
  standalone: false,
})
export class NotesListComponent implements OnInit {
  noteList: any[] = [];
  seletedNoteId: any | null = null;

  dialogNoteVisible: boolean = false;
  newNote: Note = { title: '', content: '' };

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.fecthNotes();
  }

  fecthNotes(): void {
    this.notesService.getAllNote().pipe(
      map(data =>
        data.map(note => {
          const sortDate = note.modifiedDate ? new Date(note.modifiedDate) : new Date(note.createdDate);
        return { ...note, sortDate };
        })
        .sort((a,b) => b.sortDate.getTime() - a.sortDate.getTime())
      )
    ).subscribe((data) => {
      this.noteList = data;
    });
  }

  async onSubmit(formValue: any): Promise<void> {
    try {
      if (this.seletedNoteId) {
        await this.notesService.updateNote(this.seletedNoteId.id, formValue);

      } else {
        await this.notesService.createNote(formValue);
      }
      this.dialogNoteVisible = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Note ${this.seletedNoteId ? 'updated' : 'created'} Successfully`,
      });
      this.fecthNotes();
    } catch (error) {
      console.error('Error : ', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: ' Error occured while saving the note',
      });
    }
  }

  onNoteCancel() {
    this.dialogNoteVisible = false;
    this.seletedNoteId = null;
  }

  delete(event: Event, id: any) {
    event.stopPropagation();
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Do you want to delete this record?',
      icon: 'pi pi-exclamation-circle',

      accept: () => {
        this.onDeleteConfirmed(id);
      },
    });
  }

  onDeleteConfirmed(id: any) {
    this.notesService
      .deleteNote(id)
      .then(() => {
        this.fecthNotes();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: ' Note Deleted Successfully',
        });
      })
      .catch((error) => {
        console.error('Error : ', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: ' Error occured while deleting the note',
        });
      });
  }

  showNoteDialog(note?: Note) {
    this.seletedNoteId = note || null;
    this.dialogNoteVisible = true;
  }

  truncateContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + '...';
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
