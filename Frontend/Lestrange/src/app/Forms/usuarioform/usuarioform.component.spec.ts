import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioformComponent } from './usuarioform.component';

describe('UsuarioformComponent', () => {
  let component: UsuarioformComponent;
  let fixture: ComponentFixture<UsuarioformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioformComponent]
    });
    fixture = TestBed.createComponent(UsuarioformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
