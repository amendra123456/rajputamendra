import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedDetailComponent } from './proceed-detail.component';

describe('ProceedDetailComponent', () => {
  let component: ProceedDetailComponent;
  let fixture: ComponentFixture<ProceedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProceedDetailComponent]
    });
    fixture = TestBed.createComponent(ProceedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
