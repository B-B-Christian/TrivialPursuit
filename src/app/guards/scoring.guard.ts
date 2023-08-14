import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';

// Prevents from going to the score screen unless the quiz is deemed completed
export const ScoringGuard : CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => 
  {
    const currentQuizStatus = inject(QuizService).quizStatus;
    if(currentQuizStatus == 'completed' )
    {
      return true
    }
    else
    {
      return inject(Router).createUrlTree(["/", "welcome"]);
    }
  }
  
