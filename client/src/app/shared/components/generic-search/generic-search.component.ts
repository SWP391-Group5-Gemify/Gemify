import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-generic-search',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './generic-search.component.html',
  styleUrl: './generic-search.component.scss',
})
export class GenericSearchComponent implements OnInit {
  @Input() label: string | undefined;
  @Output() onValueChanges = new EventEmitter<string | undefined>();

  inputFilter!: FormControl;

  ngOnInit(): void {
    this.inputFilter = new FormControl('');
    this.inputFilter.valueChanges
      .pipe(
        debounceTime(300), // pass the last recent emit after 300ms
        distinctUntilChanged() //  if an observable emitted the values 1, 2, 2, 3, 3, 2 - you’d get 1, 2, 3, 2 in return.
      )
      .subscribe({
        next: (value) => {
          this.onValueChanges.emit(value);
        },
      });
  }

  /**
   * Clearing the input filter
   */
  onClearInputFilter() {
    this.inputFilter.setValue('');
    this.onValueChanges.emit(undefined);
  }
}
