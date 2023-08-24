import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MussorieAuliChoptaPackagesComponent } from './mussorie-auli-chopta-packages.component';

describe('MussorieAuliChoptaPackagesComponent', () => {
  let component: MussorieAuliChoptaPackagesComponent;
  let fixture: ComponentFixture<MussorieAuliChoptaPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MussorieAuliChoptaPackagesComponent]
    });
    fixture = TestBed.createComponent(MussorieAuliChoptaPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
