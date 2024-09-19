import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWrapperComponent } from './popup-wrapper.component';

describe('PopupWrapperComponent', () => {
  let component: PopupWrapperComponent;
  let fixture: ComponentFixture<PopupWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
