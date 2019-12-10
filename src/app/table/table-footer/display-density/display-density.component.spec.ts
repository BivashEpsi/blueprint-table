import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDensityComponent } from './display-density.component';

describe('DisplayDensityComponent', () => {
  let component: DisplayDensityComponent;
  let fixture: ComponentFixture<DisplayDensityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDensityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
