import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etl } from './etl';

describe('Etl', () => {
  let component: Etl;
  let fixture: ComponentFixture<Etl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Etl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
