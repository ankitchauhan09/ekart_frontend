import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountTagComponent } from './discount-tag.component';

describe('DiscountTagComponent', () => {
  let component: DiscountTagComponent;
  let fixture: ComponentFixture<DiscountTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
