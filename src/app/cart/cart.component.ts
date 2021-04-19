import {Component, OnInit} from '@angular/core';
import {Cart} from '../models/cart.model';
import { NgModel } from '@angular/forms';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[];
  checkoutDone: boolean = false
  products: Array<any> = [
    {productId: '1', name: 'test', price: 50, quantity: 40},
    {productId: '2', name: 'test', price: 50, quantity: 3},
    {productId: '3', name: 'test', price: 50, quantity: 4},
    {productId: '4', name: 'test', price: 50, quantity: 2},
    {productId: '5', name: 'test', price: 50, quantity: 1},
    {productId: '6', name: 'test', price: 50, quantity: 5},
  ];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCartObservable.subscribe((cart) => {
      this.cart = cart
      this.cart.map(cartItem => {
        cartItem.product = this.products.find(product => cartItem.productId === product.productId);
        cartItem.product.total = cartItem.quantity * cartItem.product.price;
      });
    });

  }


  onInputQuantity(quantity: NgModel, max: number) {
    if (quantity.value >= 1 && quantity.value <= max) {
      const cart = JSON.parse(JSON.stringify(this.cart));
      cart.map(cartItem => delete cartItem.product);
      this.cartService.updateCart(cart);
    } else {
      quantity.control.setErrors({maxMin: `The value must be between 1 and ${max}`})
    }
  }

  checkout(){
    this.cartService.updateCart([]);
    this.checkoutDone = true
  }

  getTotalQuantity(){
    return this.cart.reduce((previousValue, currentValue) => previousValue +  currentValue.product.total, 0)
  }
}

