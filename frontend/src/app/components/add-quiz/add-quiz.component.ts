import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service'

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quizForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
   
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required]

    });
  }

  onSubmit() {
    // Check if the form is valid
    if (this.quizForm.invalid) {
      return;
    }

    const newQuiz = {
      title: this.quizForm.value.title
    };


    this.quizService.createQuiz(newQuiz).subscribe(
      (response) => {
        console.log('Quiz created successfully:', response);

        this.router.navigate(['/quizzes']);
      },
      (error) => {
        console.error('Error creating quiz:', error);

      }
    );
  }
}
