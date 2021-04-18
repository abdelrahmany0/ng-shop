import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cart = [
    {product: "product", price: 200, quantity: 3, total: 50},
    {product: "product", price: 200, quantity: 3, total: 50},
    {product: "product", price: 200, quantity: 3, total: 50},
    {product: "product", price: 200, quantity: 3, total: 50},
    {product: "product", price: 200, quantity: 3, total: 50},
    {product: "product", price: 200, quantity: 3, total: 50},
  ]

  onInput(event){
    console.log(event.target.value)
  }

}
