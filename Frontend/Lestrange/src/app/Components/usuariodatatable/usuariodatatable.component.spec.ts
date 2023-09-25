import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariodatatableComponent } from './usuariodatatable.component';

describe('UsuariodatatableComponent', () => {
  let component: UsuariodatatableComponent;
  let fixture: ComponentFixture<UsuariodatatableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariodatatableComponent]
    });
    fixture = TestBed.createComponent(UsuariodatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
