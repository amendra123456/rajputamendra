import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromAhmedabadComponent } from './chardham-packages-from-ahmedabad.component';

describe('ChardhamPackagesFromAhmedabadComponent', () => {
  let component: ChardhamPackagesFromAhmedabadComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromAhmedabadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromAhmedabadComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromAhmedabadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
