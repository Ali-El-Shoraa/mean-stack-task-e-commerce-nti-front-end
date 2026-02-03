import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDashborard } from './products-dashborard';

describe('ProductsDashborard', () => {
  let component: ProductsDashborard;
  let fixture: ComponentFixture<ProductsDashborard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDashborard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDashborard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
