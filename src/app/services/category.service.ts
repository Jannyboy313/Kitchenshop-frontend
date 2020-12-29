import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public fetchCategories(): Observable<Category[]> {
    return this.http
    .get<Category[]>('http://188.166.60.11/categories').pipe(
    map(data => data.map(data => new Category().deserialize(data))));
  }
}
