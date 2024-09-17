import {
  Component,
  PLATFORM_ID,
  Inject,
  OnChanges,
  Input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnChanges {
  @Input() isDarkMode = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnChanges() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
    }
  }
}
