import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuliChoptaPackagesComponent } from './auli-chopta-packages.component';

describe('AuliChoptaPackagesComponent', () => {
  let component: AuliChoptaPackagesComponent;
  let fixture: ComponentFixture<AuliChoptaPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuliChoptaPackagesComponent]
    });
    fixture = TestBed.createComponent(AuliChoptaPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
