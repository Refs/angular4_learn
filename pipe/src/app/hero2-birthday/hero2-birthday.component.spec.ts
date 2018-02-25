import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero2BirthdayComponent } from './hero2-birthday.component';

describe('Hero2BirthdayComponent', () => {
  let component: Hero2BirthdayComponent;
  let fixture: ComponentFixture<Hero2BirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hero2BirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero2BirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
