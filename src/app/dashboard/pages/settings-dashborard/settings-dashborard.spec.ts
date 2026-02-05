import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDashborard } from './settings-dashborard';

describe('SettingsDashborard', () => {
  let component: SettingsDashborard;
  let fixture: ComponentFixture<SettingsDashborard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDashborard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDashborard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
