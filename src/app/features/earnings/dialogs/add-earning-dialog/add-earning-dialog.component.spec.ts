import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEarningDialogComponent } from './add-earning-dialog.component';

describe('AddEarningDialogComponent', () => {
  let component: AddEarningDialogComponent;
  let fixture: ComponentFixture<AddEarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEarningDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
