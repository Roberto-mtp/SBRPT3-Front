import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaquesComponent } from './ataques.component';

describe('AtaquesComponent', () => {
  let component: AtaquesComponent;
  let fixture: ComponentFixture<AtaquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
