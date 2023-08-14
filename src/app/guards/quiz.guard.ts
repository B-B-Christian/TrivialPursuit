import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';

// Prevents from going to the quiz screen unless it has been setup
export const QuizGuard : CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => 
  {
    const currentQuizStatus = inject(QuizService).quizStatus;
    if(currentQuizStatus == 'isSetup' )
    {
      return true
    }
    else
    {
      return inject(Router).createUrlTree(["/", "welcome"]);
    }
  }
  
