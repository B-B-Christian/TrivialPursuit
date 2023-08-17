import { Injectable} from '@angular/core';
import { QuizType } from '../models/quiz-type.model';
import { Difficulty } from '../models/difficulty.model';
import { QuizQuestion } from '../models/quiz-question.model';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { PlayerQuestion } from '../models/player-question.model';
import { Observable, catchError, first, map } from 'rxjs';
import { apiQuestionResponse } from '../models/api-questionresponse.model';
import { QuizStatus } from '../models/quiz-status.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService
{
  numOfQuestions : number = 10
  quizType : QuizType = 'multiple'
  playerName! : string
  difficulty! : Difficulty 
  selectedCategory! : Category
  currentQuestionIndex : number = 0
  score! : number
  quizStatus : QuizStatus = 'settingUp'


  private correctAnswers! : number[]
  constructor(private httpService : HttpClient) { } 

  // Setting up the quiz; mainly used to set up the "isSetup" status for the guard
  setupQuiz(name : string, difficulty : Difficulty, category : Category)
  {
      this.playerName = name
      this.difficulty = difficulty
      this.selectedCategory = category
      this.quizStatus = 'isSetup'
  }

  // loads the questions from the api, shuffles the answers and stores the indexes of the correct answers
  loadQuiz(numOfQuestions : number) : Observable<PlayerQuestion[]>
  {
    this.numOfQuestions = numOfQuestions
    this.correctAnswers = new Array<number>(this.numOfQuestions)
    this.quizStatus = 'inProgress'
    let url = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${this.selectedCategory.id}&difficulty=${this.difficulty}&type=${this.quizType}`

    return this.httpService.get<apiQuestionResponse>(url)
    .pipe(
          map((result: apiQuestionResponse) => 
          {
            console.log(result)
            return result.results.map<PlayerQuestion>( (x, index) => 
              {
                // Converts the raw data into a quiz question with answers presented in a random order
                // it isn't sent directly as is because i want to avoid people getting the correct answer by inspecting the data    
                let quizQuestion =  new QuizQuestion(x.question, x.correct_answer, x.incorrect_answers)
                // The correct answer indexes are stored in an array
                this.correctAnswers[index] = quizQuestion.answers.findIndex(answer=> answer.isCorrect)
                // And the player gets only the question and answers
                return new PlayerQuestion(quizQuestion.question, quizQuestion.answers.flatMap(x=> x.answer))
              })  
          }),
          catchError((error) => {
            this.quizStatus = 'settingUp'
            throw Error(error);
          })

      )       
      
  }
  
  // Called after the last question has been answered, computes the score and sets the "completed" status
  scoreAnswers(answers : number[])
  {
    this.score = 0

    for(let i=0;i < this.numOfQuestions; i++)
    {
      if(answers[i] == this.correctAnswers[i])
      {
        this.score++
      }
    }
    
    this.quizStatus = 'completed'
    
  }

}
