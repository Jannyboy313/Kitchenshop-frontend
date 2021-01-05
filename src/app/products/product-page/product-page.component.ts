import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService, private cartService: CartService) { }


  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productsService.getProducts().subscribe(products => this.products = products);
  }

  getShortenedDescription(description: string) {
    let short = description.split(" ");
    let shortenedDescription;
    for (let i=0; i<short.length; i++) {
      if (i <= 25) {
        shortenedDescription.push(short[i]);
      }
      return shortenedDescription;
    }
  }

  addToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
