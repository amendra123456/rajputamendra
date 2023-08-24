import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayagrajPackagesComponent } from './prayagraj-packages.component';

describe('PrayagrajPackagesComponent', () => {
  let component: PrayagrajPackagesComponent;
  let fixture: ComponentFixture<PrayagrajPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrayagrajPackagesComponent]
    });
    fixture = TestBed.createComponent(PrayagrajPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
