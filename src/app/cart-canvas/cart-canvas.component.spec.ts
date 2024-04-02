import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCanvasComponent } from './cart-canvas.component';

describe('CartCanvasComponent', () => {
  let component: CartCanvasComponent;
  let fixture: ComponentFixture<CartCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCanvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
