import { Component, OnInit } from '@angular/core';

import { Question, Answer, QuizState } from '../models';

@Component({
  selector: 'app-question-grid',
  templateUrl: './question-grid.component.html',
  styleUrls: ['./question-grid.component.css']
})
export class QuestionGridComponent implements OnInit {
  private currentIndex : number = 0;
  private questions : Question[] = [
    new Question(1, "What is your name?", [
      new Answer(1, "Joe"),
      new Answer(2, "Kyle"),
      new Answer(3, "Clarisse")
    ], 2),
    new Question(2, "How old are you?", [
      new Answer(1, "12"),
      new Answer(2, "365"),
      new Answer(3, "27")
    ], 3),
    new Question(3, "Where do you live?", [
      new Answer(1, "Minneapolis"),
      new Answer(2, "Stillwater"),
      new Answer(3, "Woodbury")
    ], 1)
  ];
  private answeredQuestions : Array<number> = [];

  //public correctAnswers : number = 0;
  public currentQuestion : Question;
  public done : boolean = false;

  public state : QuizState;

  public previousQuestion() : void {
    if (this.currentIndex > 0) {
      this.currentQuestion = this.questions[--this.currentIndex];
    }
  }

  public nextQuestion() : void {
    

    if (this.currentIndex + 1 < this.questions.length) {
      this.currentQuestion = this.questions[++this.currentIndex];
    } else if (this.answeredQuestions.length != this.questions.length) {
      if (confirm('You have not answered all questions, are you sure you want to continue?')) {
        this.done = true;
        this.state = QuizState.ShowScore;
      }
    } else {
      this.done = true;
      this.state = QuizState.ShowScore;
    }
  }

  public answerQuestion(answerId: number) {
    if (!this.answeredQuestions.includes(this.currentQuestion.id)) {
      this.answeredQuestions.push(this.currentQuestion.id);
    }
    this.currentQuestion.answer(answerId);
  }

  public getTotalAnswered() : number {
    return this.answeredQuestions.length;
  }

  public getTotalCorrect() : number {
    let score = 0;
    this.questions.forEach(question => {
      score += +question.checkCorrect();
    });
    return score;
  }

  public printQuestionNumber() : string {
    return `Question ${this.currentIndex + 1} of ${this.questions.length}`;
  }

  public printScore() : string {
    const correct = this.getTotalCorrect();
    const score = correct / this.questions.length;
    let msg = 'Something went wrong...';

    if (score == 1) {
      msg = 'Perfect!';
    } else if (score >= .9) {
      msg = 'Amazing!';
    } else if (score >= .8) {
      msg = 'Great!';
    } else if (score >= .7) {
      msg = 'Good!';
    } else if (score >= .6) {
      msg = 'Needs some work!';
    } else {
      msg = 'Study harder!';
    }

    return `You scored ${correct} out of ${this.questions.length}: ${(score * 100).toFixed(2)}% -- ${msg}`;
  }

  public reviewAnswers() : void {
    this.currentIndex = 0;
    this.currentQuestion = this.questions[this.currentIndex];

    this.state = QuizState.ShowAnswers;
  }

  public reset() : void {
    this.currentIndex = 0;
    this.answeredQuestions = [];

    this.questions.forEach(question => {
      question.selectedAnswerId = 0;
    });

    this.currentQuestion = this.questions[this.currentIndex];
    this.done = false;
    this.state = QuizState.Quiz;
  }

  constructor() { }

  ngOnInit() {
    this.reset();
  }

}
