import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersDashborard } from './offers-dashborard';

describe('OffersDashborard', () => {
  let component: OffersDashborard;
  let fixture: ComponentFixture<OffersDashborard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersDashborard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersDashborard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
