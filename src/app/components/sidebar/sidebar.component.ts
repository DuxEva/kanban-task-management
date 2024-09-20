import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { AppState, Board } from '../../models';
import { select, Store } from '@ngrx/store';
import * as taskSelectors from '../../store/task.selectors';
import * as taskActions from '../../store/task.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  darkMode = false;
  isSidebarOpen!: boolean;
  @Output() darkModeChange = new EventEmitter<boolean>();

  boards!: Board[];
  selectedBoard!: Board;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    public store: Store<AppState>
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyThemePreference();
    }

    this.store.pipe(select(taskSelectors.selectBoards)).subscribe((boards) => {
      this.boards = boards;
    });

    this.store
      .pipe(select(taskSelectors.selectActivatedBoard))
      .subscribe((board) => {
        this.selectedBoard = board;
      });

    this.store.select(taskSelectors.selectSidebarState).subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }

  selectBoard(board: Board) {
    this.store.dispatch(
      taskActions.changeActivateddBoard({ title: board.name })
    );
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
    this.store.dispatch(
      taskActions.openSidebar({ isSidebarOpen: this.isSidebarOpen })
    );
  }

  onCreateNewBoard(): void {
    this.store.dispatch(taskActions.showModel({ showModel: 'createBoard' }));
  }

  onSidebarOpen() {
    this.store.dispatch(taskActions.openSidebar({ isSidebarOpen: true }));
  }
}
