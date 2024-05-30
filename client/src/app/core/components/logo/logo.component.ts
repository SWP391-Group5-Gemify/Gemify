import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  // Logo
  logo = { name: 'Gemify' };
  @Input() classLogoSize: string = '';

  preventDefault(event: Event) {
    event.preventDefault();
  }
}
