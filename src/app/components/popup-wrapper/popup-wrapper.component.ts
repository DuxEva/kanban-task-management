import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-wrapper',
  templateUrl: './popup-wrapper.component.html',
  styleUrl: './popup-wrapper.component.css',
})
export class PopupWrapperComponent {
  modalStatus!: boolean;
  dialogueMode!: string;

  constructor() {}

  ngOnInit(): void {
    this.modalStatus = true;
    this.dialogueMode = 'create';
  }

  toggleDialogue() {
    this.modalStatus = !this.modalStatus;
  }
}
