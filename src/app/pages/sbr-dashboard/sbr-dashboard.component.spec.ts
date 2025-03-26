import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbrDashboardComponent } from './sbr-dashboard.component';

describe('SbrDashboardComponent', () => {
  let component: SbrDashboardComponent;
  let fixture: ComponentFixture<SbrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbrDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
