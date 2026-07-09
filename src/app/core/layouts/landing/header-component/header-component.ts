import { Component, input } from '@angular/core';

@Component({
  selector: 'landing-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  title = input.required<string>();
}
