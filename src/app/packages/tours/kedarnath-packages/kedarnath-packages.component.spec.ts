import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KedarnathPackagesComponent } from './kedarnath-packages.component';

describe('KedarnathPackagesComponent', () => {
  let component: KedarnathPackagesComponent;
  let fixture: ComponentFixture<KedarnathPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KedarnathPackagesComponent]
    });
    fixture = TestBed.createComponent(KedarnathPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
