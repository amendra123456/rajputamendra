import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamAdventurePackagesComponent } from './chardham-adventure-packages.component';

describe('ChardhamAdventurePackagesComponent', () => {
  let component: ChardhamAdventurePackagesComponent;
  let fixture: ComponentFixture<ChardhamAdventurePackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamAdventurePackagesComponent]
    });
    fixture = TestBed.createComponent(ChardhamAdventurePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
