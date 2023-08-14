import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService 
{
  
  constructor(private httpService: HttpClient) { }
  
  // retrieves the categories data from the api
  getCategories()
  //: Category[]
  {
    return this.httpService.get('https://opentdb.com/api_category.php')
  }


}
