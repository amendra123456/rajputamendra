import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaliPackagesComponent } from './manali-packages.component';

describe('ManaliPackagesComponent', () => {
  let component: ManaliPackagesComponent;
  let fixture: ComponentFixture<ManaliPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManaliPackagesComponent]
    });
    fixture = TestBed.createComponent(ManaliPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
