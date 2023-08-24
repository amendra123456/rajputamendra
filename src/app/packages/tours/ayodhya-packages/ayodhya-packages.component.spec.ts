import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyodhyaPackagesComponent } from './ayodhya-packages.component';

describe('AyodhyaPackagesComponent', () => {
  let component: AyodhyaPackagesComponent;
  let fixture: ComponentFixture<AyodhyaPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyodhyaPackagesComponent]
    });
    fixture = TestBed.createComponent(AyodhyaPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
