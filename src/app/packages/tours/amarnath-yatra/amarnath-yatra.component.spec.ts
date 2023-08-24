import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarnathYatraComponent } from './amarnath-yatra.component';

describe('AmarnathYatraComponent', () => {
  let component: AmarnathYatraComponent;
  let fixture: ComponentFixture<AmarnathYatraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmarnathYatraComponent]
    });
    fixture = TestBed.createComponent(AmarnathYatraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
