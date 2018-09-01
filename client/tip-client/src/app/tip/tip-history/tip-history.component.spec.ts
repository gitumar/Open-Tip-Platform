import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipHistoryComponent } from './tip-history.component';

describe('TipHistoryComponent', () => {
  let component: TipHistoryComponent;
  let fixture: ComponentFixture<TipHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
