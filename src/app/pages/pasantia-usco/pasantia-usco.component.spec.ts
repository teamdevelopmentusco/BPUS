import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasantiaUscoComponent } from './pasantia-usco.component';

describe('PasantiaUscoComponent', () => {
  let component: PasantiaUscoComponent;
  let fixture: ComponentFixture<PasantiaUscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasantiaUscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasantiaUscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
