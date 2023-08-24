import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamFamilyPackagesComponent } from './chardham-family-packages.component';

describe('ChardhamFamilyPackagesComponent', () => {
  let component: ChardhamFamilyPackagesComponent;
  let fixture: ComponentFixture<ChardhamFamilyPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamFamilyPackagesComponent]
    });
    fixture = TestBed.createComponent(ChardhamFamilyPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
