import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../../models/note.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.css',
  standalone: false
})
export class NoteDialogComponent  {

  @Input() visible: boolean = false;
  @Input() selectedNote: Note | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();


  noteForm: FormGroup;

  constructor(
      private fb: FormBuilder) {
      this.noteForm = this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required]
      })
    }


  ngOnChanges() {
    if(this.selectedNote) {
      this.noteForm.patchValue(this.selectedNote)
    }else{
      this.noteForm.reset()
    }
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }
    this.save.emit(this.noteForm.value)
    this.visibleChange.emit(false)
  }

  onCancel() {
    this.cancel.emit();
    this.noteForm.reset();
    this.visibleChange.emit(false)
  }

}
