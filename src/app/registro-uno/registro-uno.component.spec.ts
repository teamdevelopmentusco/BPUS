import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUnoComponent } from './registro-uno.component';

describe('RegistroUnoComponent', () => {
  let component: RegistroUnoComponent;
  let fixture: ComponentFixture<RegistroUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
