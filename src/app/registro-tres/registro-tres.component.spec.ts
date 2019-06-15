import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTresComponent } from './registro-tres.component';

describe('RegistroTresComponent', () => {
  let component: RegistroTresComponent;
  let fixture: ComponentFixture<RegistroTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
