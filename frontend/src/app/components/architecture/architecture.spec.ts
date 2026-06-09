import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Architecture } from './architecture';

describe('Architecture', () => {
  let component: Architecture;
  let fixture: ComponentFixture<Architecture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Architecture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Architecture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
