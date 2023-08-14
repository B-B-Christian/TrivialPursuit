import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {

  playerScore! : number
  playerName! : string
  constructor(private router : Router,private quizService : QuizService){}
  
  ngOnInit(): void {

    this.playerName = this.quizService.playerName
    this.playerScore = this.quizService.score  
  }

}
