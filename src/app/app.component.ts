import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'kanban-task-management';

  darkMode = false;
  isSidebarOpen = true;
  changeDarkMode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  toggleSidebar(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
