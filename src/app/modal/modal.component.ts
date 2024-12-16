import { Component, input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  title = input.required<string>();
}
