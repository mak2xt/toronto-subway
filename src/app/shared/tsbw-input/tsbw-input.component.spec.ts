import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TSBWInputComponent} from './tsbw-input.component';

describe('TSBWInputComponent', () => {
  let component: TSBWInputComponent;
  let fixture: ComponentFixture<TSBWInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSBWInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSBWInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have control input', () => {
    expect(component.control).toBeDefined()
  })
  it('should have placehld input', () => {
    expect(component.placehld).toBeDefined()
  })
});
