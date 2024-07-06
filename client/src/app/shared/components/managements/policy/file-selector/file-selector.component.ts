import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-selector',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './file-selector.component.html',
  styleUrl: './file-selector.component.scss',
})
export class FileSelectorComponent {
  // ===========================
  // == Fields
  // ===========================
  fileSelected = output<File[]>();
  label = input<string>('Select Files');

  // ===========================
  // == Methods
  // ===========================
  /**
   * Select multiple files as PDF only
   * @param event
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    // If select file, then push into the list of pre-uploaded file
    if (input.files) {
      this.fileSelected.emit(
        Array.from(input.files).filter(
          (file) => file.type === 'application/pdf'
        )
      );
    }
  }
}
