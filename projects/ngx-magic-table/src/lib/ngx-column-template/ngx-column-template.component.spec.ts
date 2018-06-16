import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxColumnTemplateComponent } from './ngx-column-template.component';

describe('NgxColumnTemplateComponent', () => {
  let component: NgxColumnTemplateComponent;
  let fixture: ComponentFixture<NgxColumnTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxColumnTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxColumnTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
