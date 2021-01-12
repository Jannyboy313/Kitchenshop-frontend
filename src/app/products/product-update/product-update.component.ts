import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  deleteButton(product) {

  }

  updateButton(product) {

  }

  private getProducts() {
    this.productsService.getProducts().subscribe(products => this.products = products);
  }


  getShortenedDescription(description: string) {
    let short = description.split(" ");
    let shortenedDescription: string = '';
    for (let i=0; i<short.length; i++) {
      if (i <= 25) {
        shortenedDescription += ' ' + short[i]
      }else {
        return shortenedDescription.trim();
      }
    }
  }
}
