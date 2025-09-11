import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackDetailsModalComponent } from './attack-details-modal.component';

describe('AttackDetailsModalComponent', () => {
  let component: AttackDetailsModalComponent;
  let fixture: ComponentFixture<AttackDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttackDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttackDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
