import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDashboardTableComponent } from './orders-dashboard-table.component';

describe('OrdersDashboardTableComponent', () => {
  let component: OrdersDashboardTableComponent;
  let fixture: ComponentFixture<OrdersDashboardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDashboardTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
