import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService,
              private cartService: CartService,
              private modalService: ModalService) { }


  ngOnInit(): void {
    this.getProducts();
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

  openInfoModal(product: Product) {
    this.modalService.open(product.name);
  }

  addToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
