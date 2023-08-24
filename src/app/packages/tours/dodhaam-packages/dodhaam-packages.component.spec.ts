import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodhaamPackagesComponent } from './dodhaam-packages.component';

describe('DodhaamPackagesComponent', () => {
  let component: DodhaamPackagesComponent;
  let fixture: ComponentFixture<DodhaamPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodhaamPackagesComponent]
    });
    fixture = TestBed.createComponent(DodhaamPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
