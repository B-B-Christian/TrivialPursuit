import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Difficulty } from 'src/app/models/difficulty.model';
import { PlayerQuestion } from 'src/app/models/player-question.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  numOfQuestions : number = 10
  playerName! : string
  difficulty! : Difficulty
  categoryName! : string
  currentQuestionIndex! : number
  //questions! : Observable<PlayerQuestion[]>
  questions! : PlayerQuestion[]
  currentQuestion! : PlayerQuestion
  answers : number[] = new Array<number>(this.numOfQuestions)

  constructor(private router : Router,private quizService : QuizService){}
  
  ngOnInit(): void {

    //this.questions = this.quizService.loadQuiz(this.numOfQuestions)    
    //let question : PlayerQuestion
    this.currentQuestionIndex = 0
    //this.questions = this.quizService.loadQuiz(this.numOfQuestions)
    this.quizService.loadQuiz(this.numOfQuestions)
    .subscribe( (questions) =>
    { 
      this.questions = questions
      this.currentQuestion = this.questions[this.currentQuestionIndex]
    })
    
    this.playerName = this.quizService.playerName
    this.categoryName = this.quizService.selectedCategory.name
    this.difficulty = this.quizService.difficulty
  }

  submitAnswer(questionIndex : number,answerIndex : number)
  {
    this.answers[questionIndex] = answerIndex
    if(this.currentQuestionIndex < this.numOfQuestions - 1)
    {
      // Go forward with the quiz
      this.currentQuestionIndex++
      this.currentQuestion = this.questions[this.currentQuestionIndex]
    } 
    else 
    {
      // Finish the quiz and give the results
      this.quizService.scoreAnswers(this.answers)
      this.router.navigate(['/scoring']); 
    }  
  }
  

}
