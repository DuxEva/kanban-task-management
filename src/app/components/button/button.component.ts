import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() customStyle: string = '';
  @Input() customTextStyle: string = '';
  @Input() icon?: string;
}
