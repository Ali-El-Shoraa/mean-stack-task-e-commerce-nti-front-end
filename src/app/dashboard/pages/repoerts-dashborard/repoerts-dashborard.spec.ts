import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoertsDashborard } from './repoerts-dashborard';

describe('RepoertsDashborard', () => {
  let component: RepoertsDashborard;
  let fixture: ComponentFixture<RepoertsDashborard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoertsDashborard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoertsDashborard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
