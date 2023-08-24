import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoorgPackagesComponent } from './coorg-packages.component';

describe('CoorgPackagesComponent', () => {
  let component: CoorgPackagesComponent;
  let fixture: ComponentFixture<CoorgPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoorgPackagesComponent]
    });
    fixture = TestBed.createComponent(CoorgPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
