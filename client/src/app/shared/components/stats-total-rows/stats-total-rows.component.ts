import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-total-rows',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './stats-total-rows.component.html',
  styleUrl: './stats-total-rows.component.scss',
})
export class StatsTotalRowsComponent {
  @Input() count: number = 0; // Default value for count
  @Input() label: string = ''; // Default value for count
  @Input() icon: string = ''; // Default value for icon name

  constructor() {}
}
