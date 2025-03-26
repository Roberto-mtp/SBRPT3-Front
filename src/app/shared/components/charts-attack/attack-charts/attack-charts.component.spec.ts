import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackChartsComponent } from './attack-charts.component';

describe('AttackChartsComponent', () => {
  let component: AttackChartsComponent;
  let fixture: ComponentFixture<AttackChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttackChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttackChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
