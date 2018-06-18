import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEnumFilterComponent } from './ngx-enum-filter.component';

describe('NgxStringFilterComponent', () => {
  let component: NgxEnumFilterComponent;
  let fixture: ComponentFixture<NgxEnumFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxEnumFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEnumFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
