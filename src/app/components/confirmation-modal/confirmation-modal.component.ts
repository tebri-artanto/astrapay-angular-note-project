import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
  standalone: false
})
export class ConfirmationModalComponent {
  @Input() message: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

}
