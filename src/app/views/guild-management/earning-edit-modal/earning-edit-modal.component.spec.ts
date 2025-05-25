import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningEditModalComponent } from './earning-edit-modal.component';

describe('EarningEditModalComponent', () => {
  let component: EarningEditModalComponent;
  let fixture: ComponentFixture<EarningEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EarningEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
