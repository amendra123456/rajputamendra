import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromDelhiComponent } from './chardham-packages-from-delhi.component';

describe('ChardhamPackagesFromDelhiComponent', () => {
  let component: ChardhamPackagesFromDelhiComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromDelhiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromDelhiComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromDelhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
