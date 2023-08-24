import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromMumbaiComponent } from './chardham-packages-from-mumbai.component';

describe('ChardhamPackagesFromMumbaiComponent', () => {
  let component: ChardhamPackagesFromMumbaiComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromMumbaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromMumbaiComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromMumbaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
