import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadrinathAuliChoptaPackageComponent } from './badrinath-auli-chopta-package.component';

describe('BadrinathAuliChoptaPackageComponent', () => {
  let component: BadrinathAuliChoptaPackageComponent;
  let fixture: ComponentFixture<BadrinathAuliChoptaPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadrinathAuliChoptaPackageComponent]
    });
    fixture = TestBed.createComponent(BadrinathAuliChoptaPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
