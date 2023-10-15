import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUninitiatedComponent } from './dashboard-uninitiated.component';

describe('DashboardUninitiatedComponent', () => {
  let component: DashboardUninitiatedComponent;
  let fixture: ComponentFixture<DashboardUninitiatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUninitiatedComponent]
    });
    fixture = TestBed.createComponent(DashboardUninitiatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
