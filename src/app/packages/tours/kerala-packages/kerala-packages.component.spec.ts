import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeralaPackagesComponent } from './kerala-packages.component';

describe('KeralaPackagesComponent', () => {
  let component: KeralaPackagesComponent;
  let fixture: ComponentFixture<KeralaPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeralaPackagesComponent]
    });
    fixture = TestBed.createComponent(KeralaPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
