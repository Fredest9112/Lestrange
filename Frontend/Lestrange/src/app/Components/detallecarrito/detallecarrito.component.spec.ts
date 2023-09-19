import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecarritoComponent } from './detallecarrito.component';

describe('DetallecarritoComponent', () => {
  let component: DetallecarritoComponent;
  let fixture: ComponentFixture<DetallecarritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallecarritoComponent]
    });
    fixture = TestBed.createComponent(DetallecarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
