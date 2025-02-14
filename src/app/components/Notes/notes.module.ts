import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './notes-list/notes-list.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { Chip } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TextareaModule } from 'primeng/textarea';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [ NoteDialogComponent, NotesListComponent, ConfirmationModalComponent],
  imports: [
    ConfirmDialogModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    CardModule,
    ToastModule,
    Dialog,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    InputIcon,
    Chip,
  ],
  exports:[
    NoteDialogComponent, NotesListComponent,
  ],
  providers: [MessageService, ConfirmationService],

})
export class NotesModule { }
