import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { detalleComponent } from './detalle.component';

describe('detalleComponent', () => {
  let component: detalleComponent;
  let fixture: ComponentFixture<detalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ detalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(detalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
