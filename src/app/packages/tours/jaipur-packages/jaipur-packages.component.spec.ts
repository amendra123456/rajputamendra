import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaipurPackagesComponent } from './jaipur-packages.component';

describe('JaipurPackagesComponent', () => {
  let component: JaipurPackagesComponent;
  let fixture: ComponentFixture<JaipurPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JaipurPackagesComponent]
    });
    fixture = TestBed.createComponent(JaipurPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
