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
    console.log(short)
    let shortenedDescription: string = '';
    for (let i=0; i<short.length; i++) {
      if (i <= 25) {
        console.log("This is the word ", short[i])
        shortenedDescription += ' ' + short[i]
      }else {
        return shortenedDescription.trim();
      }
    }
  }

  addToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
