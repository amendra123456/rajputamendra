import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadrinathPackagesComponent } from './badrinath-packages.component';

describe('BadrinathPackagesComponent', () => {
  let component: BadrinathPackagesComponent;
  let fixture: ComponentFixture<BadrinathPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadrinathPackagesComponent]
    });
    fixture = TestBed.createComponent(BadrinathPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
