import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Difficulty } from 'src/app/models/difficulty.model';
import { CategoryDataService } from 'src/app/services/categorydata.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  welcomeForm! : FormGroup
  categories!: Category[]

  constructor(private router : Router, private categoryService : CategoryDataService, private quizService : QuizService){}

  ngOnInit(): void {
     
    this.quizService.quizStatus = 'settingUp'
    this.getCategories()

    this.welcomeForm = new FormGroup(
    {
        name : new FormControl(null, Validators.required),
        difficulty : new FormControl(null, Validators.required),
        category : new FormControl(null, Validators.required)
    })

  }

  getCategories()
  {
        this.categoryService.getCategories().subscribe((data : any) => 
        { 
          // Look for a cleaner way
          this.categories  = Object.keys(data).map((key)=> { return data[key] })[0] 
        }) 
  }
  

  onFormSubmit()
  {
    
    this.quizService.setupQuiz(this.welcomeForm.value.name,
                               this.welcomeForm.value.difficulty,
                               this.categories.find(x=> x.id == this.welcomeForm.value.category)!);
    
    this.router.navigate(['/quiz']); 
  }

}
