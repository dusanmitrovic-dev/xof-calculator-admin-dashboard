import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningDialogComponent } from './earning-dialog.component';

describe('EarningDialogComponent', () => {
  let component: EarningDialogComponent;
  let fixture: ComponentFixture<EarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
