import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEarningDialogComponent } from './edit-earning-dialog.component';

describe('EditEarningDialogComponent', () => {
  let component: EditEarningDialogComponent;
  let fixture: ComponentFixture<EditEarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEarningDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
