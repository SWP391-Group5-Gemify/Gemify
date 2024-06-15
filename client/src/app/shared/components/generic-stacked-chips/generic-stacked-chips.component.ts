import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-generic-stacked-chips',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './generic-stacked-chips.component.html',
  styleUrl: './generic-stacked-chips.component.scss',
})
export class GenericStackedChipsComponent {
  readonly bestBoys: string[] = ['Samoyed', 'Akita Inu', 'Alaskan Malamute', 'Siberian Husky'];
}
}
