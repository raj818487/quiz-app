import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { questions } from '../../assets/questions';
import { QuestionsListService } from '../questions-list.service';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, ProgressBarModule, StepsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  questions: Array<Object> = [];
  questionNo: number = 0;
  question: any;
  answers: Array<any> = new Array(10).fill(null);
  selectedAnswer: number | null = null;
  steps: any[] = [];
  @Output('endQuiz') endQuiz: EventEmitter<any> = new EventEmitter();
  constructor(private QuestionsListService: QuestionsListService) {}

  shuffle(array: Array<Object>) {
    array.sort(() => Math.random() - 0.5);
  }
  ngOnInit(): void {
    this.questions = this.randomQuestions();
    this.question = this.questions[0];
    this.QuestionsListService.setQuestions(this.questions);
    this.initializeSteps();
  }
  randomQuestions() {
    this.shuffle(questions);
    return questions.slice(0, 10);
  }
  
  initializeSteps() {
    this.steps = [];
    for (let i = 0; i < 10; i++) {
      this.steps.push({
        label: `Q${i + 1}`,
        command: () => this.setQuestion(i)
      });
    }
  }
  setQuestion(queNo: number) {
    this.questionNo = queNo;
    this.question = this.questions[queNo];
    this.selectedAnswer = this.answers[queNo];
  }
  selectOption(optionIndex: number) {
    this.setAnswer(this.questionNo, optionIndex);
  }
  setAnswer(index: number, answer: number) {
    this.answers[index] = answer;
    this.selectedAnswer = answer;
    this.QuestionsListService.setAnswers(this.answers);
  }
  nextQue() {
    if (this.questionNo < 9) {
      this.questionNo += 1;
      this.setQuestion(this.questionNo);
    }
  }
  prevQue() {
    if (this.questionNo > 0) {
      this.questionNo -= 1;
      this.setQuestion(this.questionNo);
    }
  }
  clear() {
    this.answers[this.questionNo] = null;
    this.selectedAnswer = null;
  }
  submit() {
    this.endQuiz.emit();
  }
}
