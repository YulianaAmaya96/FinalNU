
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Barra-menu } from './barra-menu.component';

describe('Barra-menu', () => {
  let component: Barra-menu;
  let fixture: ComponentFixture<Barra-menu>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barra-menu ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Barra-menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
