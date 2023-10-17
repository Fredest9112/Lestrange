import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecarritoformComponent } from './detallecarritoform.component';

describe('DetallecarritoformComponent', () => {
  let component: DetallecarritoformComponent;
  let fixture: ComponentFixture<DetallecarritoformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallecarritoformComponent]
    });
    fixture = TestBed.createComponent(DetallecarritoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
