import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackDetailComponent } from './pack-detail.component';

describe('PackDetailComponent', () => {
  let component: PackDetailComponent;
  let fixture: ComponentFixture<PackDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackDetailComponent]
    });
    fixture = TestBed.createComponent(PackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
