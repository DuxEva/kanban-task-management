import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  darkMode = false;
  isSidebarOpen = true;
  @Output() onSidebarToggle = new EventEmitter<boolean>();
  @Output() darkModeChange = new EventEmitter<boolean>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyThemePreference();
    }
  }

  applyThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.darkMode =
      savedTheme === 'dark' ||
      (!savedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    this.updateDarkModeClass(this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.updateDarkModeClass(this.darkMode);
    this.onDarkModeChange();
  }

  private updateDarkModeClass(isDarkMode: boolean) {
    if (isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }

  onDarkModeChange() {
    this.darkModeChange.emit(this.darkMode);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.onSidebarToggle.emit(this.isSidebarOpen);
  }
}
