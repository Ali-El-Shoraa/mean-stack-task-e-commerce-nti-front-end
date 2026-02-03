import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDashborard } from './orders-dashborard';

describe('OrdersDashborard', () => {
  let component: OrdersDashborard;
  let fixture: ComponentFixture<OrdersDashborard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDashborard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDashborard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
