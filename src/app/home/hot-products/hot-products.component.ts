import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-products',
  templateUrl: './hot-products.component.html',
  styleUrls: ['./hot-products.component.css']
})
export class HotProductsComponent implements OnInit {
  hotProducts = [
    {
      "name": "Kenwood machine",
      "price": "10.99",
      "description": "THIS IS AMAZING",
      "image": null
    },
    {
      "name": "Bosch machine",
      "price": "109.99",
      "description": "THIS IS AMAZING",
      "image": null
    },
    {
      "name": "KitchenAid machine",
      "price": "999.99",
      "description": "THIS IS AMAZING",
      "image": null
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
