import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UttarakhandPackagesComponent } from './uttarakhand-packages.component';

describe('UttarakhandPackagesComponent', () => {
  let component: UttarakhandPackagesComponent;
  let fixture: ComponentFixture<UttarakhandPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UttarakhandPackagesComponent]
    });
    fixture = TestBed.createComponent(UttarakhandPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
