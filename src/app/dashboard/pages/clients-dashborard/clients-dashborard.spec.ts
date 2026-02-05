import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDashborard } from './clients-dashborard';

describe('ClientsDashborard', () => {
  let component: ClientsDashborard;
  let fixture: ComponentFixture<ClientsDashborard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsDashborard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsDashborard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
