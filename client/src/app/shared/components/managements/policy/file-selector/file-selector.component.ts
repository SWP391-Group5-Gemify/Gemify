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
  fileSelected = output<File[]>();

  /**
   * When user selects one or more files, capture the list of files and store within the * FileList
   * @param event
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    // If select file, then push into the list of pre-uploaded file
    if (input.files) {
      this.fileSelected.emit(Array.from(input.files));
    }
  }
}
