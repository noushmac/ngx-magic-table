import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNumericFilterComponent } from './ngx-numeric-filter.component';

describe('NgxNumericFilterComponent', () => {
  let component: NgxNumericFilterComponent;
  let fixture: ComponentFixture<NgxNumericFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNumericFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNumericFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
