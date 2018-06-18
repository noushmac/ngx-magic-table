import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBooleanFilterComponent } from './ngx-boolean-filter.component';

describe('NgxStringFilterComponent', () => {
  let component: NgxBooleanFilterComponent;
  let fixture: ComponentFixture<NgxBooleanFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBooleanFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBooleanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
