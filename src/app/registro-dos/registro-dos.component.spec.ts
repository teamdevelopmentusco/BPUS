import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDosComponent } from './registro-dos.component';

describe('RegistroDosComponent', () => {
  let component: RegistroDosComponent;
  let fixture: ComponentFixture<RegistroDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
