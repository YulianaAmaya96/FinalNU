
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { carroComponent } from './carro.component';

describe('carroComponent', () => {
  let component: carroComponent;
  let fixture: ComponentFixture<carroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ carroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(carroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
