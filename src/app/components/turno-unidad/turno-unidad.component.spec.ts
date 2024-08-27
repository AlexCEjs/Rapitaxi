import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoUnidadComponent } from './turno-unidad.component';

describe('TurnoUnidadComponent', () => {
  let component: TurnoUnidadComponent;
  let fixture: ComponentFixture<TurnoUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnoUnidadComponent]
    });
    fixture = TestBed.createComponent(TurnoUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
