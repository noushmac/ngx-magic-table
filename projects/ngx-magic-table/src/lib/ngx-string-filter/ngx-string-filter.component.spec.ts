import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStringFilterComponent } from './ngx-string-filter.component';

describe('NgxStringFilterComponent', () => {
  let component: NgxStringFilterComponent;
  let fixture: ComponentFixture<NgxStringFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxStringFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxStringFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
