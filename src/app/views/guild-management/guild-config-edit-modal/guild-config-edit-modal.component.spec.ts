import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildConfigEditModalComponent } from './guild-config-edit-modal.component';

describe('GuildConfigEditModalComponent', () => {
  let component: GuildConfigEditModalComponent;
  let fixture: ComponentFixture<GuildConfigEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuildConfigEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildConfigEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
