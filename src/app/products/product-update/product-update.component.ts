import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  products: Product[] = []
  isDisabled: boolean = false;
  isError: boolean = false;
  errorMessage: string = "Error not known";
  constructor(private productsService: ProductsService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  deleteButton(product, index) {
    this.isDisabled = true;
    this.isError = false;
    this.productsService.deleteProduct(product.productnumber)
    .subscribe({
      next: () => {
          console.log("This is a succes")
          console.log("This is the index: ", index)
          this.products.splice(index, 1);
          this.isDisabled = false;
      },
      error: error => {
          this.isDisabled = false;
          this.isError = true;
          this.errorMessage = error.error.error;
      }
    });
  }

  editButton(product) {
    this.modalService.open(product.productnumber);
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
