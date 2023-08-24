import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KashiPackagesComponent } from './kashi-packages.component';

describe('KashiPackagesComponent', () => {
  let component: KashiPackagesComponent;
  let fixture: ComponentFixture<KashiPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KashiPackagesComponent]
    });
    fixture = TestBed.createComponent(KashiPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
