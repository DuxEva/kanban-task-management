import { Component, Input } from '@angular/core';
import { Column } from '../../models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  @Input() column!: Column;
}
