import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ScoringComponent } from './components/scoring/scoring.component';
import { QuizGuard } from './guards/quiz.guard';
import { ScoringGuard } from './guards/scoring.guard';


const routes: Routes = 
[
  {path:'', pathMatch: 'full', redirectTo: 'welcome'},
  {path:'welcome', component:WelcomeComponent},
  {path:'quiz', component:QuizComponent, canActivate: [QuizGuard]},
  {path:'scoring', component:ScoringComponent, canActivate: [ScoringGuard]},
  {path:'404', component:NotfoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
