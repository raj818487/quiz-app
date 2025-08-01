import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionsListService {
  private questions: Array<Object> = [];
  private answers: Array<any> = [];

  setQuestions(questions: Array<Object>) {
    this.questions = [...questions];
  }
  getQuestions() {
    return this.questions;
  }
  setAnswers(answers: Array<any>) {
    this.answers = [...answers];
  }
  getAnswers() {
    return this.answers;
  }
}
