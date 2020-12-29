import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories = []
  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories() {
    this.getService.getCategories().subscribe(categories => this.categories = categories);
  }

}
