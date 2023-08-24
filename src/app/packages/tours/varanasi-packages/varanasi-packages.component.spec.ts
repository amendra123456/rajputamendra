import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaranasiPackagesComponent } from './varanasi-packages.component';

describe('VaranasiPackagesComponent', () => {
  let component: VaranasiPackagesComponent;
  let fixture: ComponentFixture<VaranasiPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaranasiPackagesComponent]
    });
    fixture = TestBed.createComponent(VaranasiPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
