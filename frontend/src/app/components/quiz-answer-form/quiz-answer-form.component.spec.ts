import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAnswerFormComponent } from './quiz-answer-form.component';

describe('QuizAnswerFormComponent', () => {
  let component: QuizAnswerFormComponent;
  let fixture: ComponentFixture<QuizAnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizAnswerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
