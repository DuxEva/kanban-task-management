import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteboardComponent } from './deleteboard.component';

describe('DeleteboardComponent', () => {
  let component: DeleteboardComponent;
  let fixture: ComponentFixture<DeleteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
