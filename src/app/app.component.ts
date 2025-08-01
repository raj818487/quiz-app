import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ScreenService } from './screen.service';
import { ResultComponent } from './result/result.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, QuizComponent, ResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'quiz-app';
  screen: number = 1;

  constructor(private ScreenService: ScreenService) {}

  ngOnint() {
    this.screen = this.ScreenService.getScreen();
  }
  changeScreen(screenNo: number) {
    this.ScreenService.setScreen(screenNo);
    this.screen = screenNo;
  }
  endQuiz() {
    this.ScreenService.setScreen(3);
    this.screen = 3;
  }
}
