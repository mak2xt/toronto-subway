import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TSBWDropdownComponent } from './tsbw-dropdown.component';

describe('TSBWDropdownComponent', () => {
  let component: TSBWDropdownComponent;
  let fixture: ComponentFixture<TSBWDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSBWDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSBWDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
