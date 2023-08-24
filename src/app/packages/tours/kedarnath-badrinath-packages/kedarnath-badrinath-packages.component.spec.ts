import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KedarnathBadrinathPackagesComponent } from './kedarnath-badrinath-packages.component';

describe('KedarnathBadrinathPackagesComponent', () => {
  let component: KedarnathBadrinathPackagesComponent;
  let fixture: ComponentFixture<KedarnathBadrinathPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KedarnathBadrinathPackagesComponent]
    });
    fixture = TestBed.createComponent(KedarnathBadrinathPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
