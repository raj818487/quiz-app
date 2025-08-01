import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsListService } from '../questions-list.service';
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  questions: Array<any> = [];
  correctAnswers: Array<number> = [];
  answers: Array<any> = [];
  correct: number = 0;
  wrong: number = 0;
  unattempted: number = 0;

  constructor(private QuestionsListService: QuestionsListService) {}
  ngOnInit() {
    this.questions = this.QuestionsListService.getQuestions();
    this.answers = this.QuestionsListService.getAnswers();

    this.questions.forEach((question, index) => {
      if (question.answer == this.answers[index]) {
        this.correct++;
      } else if (this.answers[index] == null) {
        this.unattempted++;
      } else {
        this.wrong++;
      }
    });
  }
  reload() {
    window.location.reload();
  }
}
