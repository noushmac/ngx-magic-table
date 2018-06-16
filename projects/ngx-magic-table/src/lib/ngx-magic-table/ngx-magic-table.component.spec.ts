import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMagicTableComponent } from './ngx-magic-table.component';

describe('NgxMagicTableComponent', () => {
  let component: NgxMagicTableComponent;
  let fixture: ComponentFixture<NgxMagicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMagicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMagicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
