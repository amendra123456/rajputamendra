import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadakhPackagesComponent } from './ladakh-packages.component';

describe('LadakhPackagesComponent', () => {
  let component: LadakhPackagesComponent;
  let fixture: ComponentFixture<LadakhPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LadakhPackagesComponent]
    });
    fixture = TestBed.createComponent(LadakhPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
