import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart} from '../models/cart.model';
import {NgModel} from '@angular/forms';
import {CartService} from '../services/cart.service';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart[];
  checkoutDone: boolean = false;
  checkoutInvalid: boolean = false;
  total = 0;
  private cartServiceSubscription: Subscription;

  constructor(private cartService: CartService, private productService: ProductsService) { }


  ngOnInit(): void {
    this.cartServiceSubscription = this.cartService.getCartObservable.subscribe((cart) => {
      const tempCart: Cart[] = cart;
      for (let [index, cartItem] of cart.entries()) {
        if(this.cart && this.cart[index].product) continue;
        this.productService.getProductDetails(cartItem.productId).subscribe((result) => {
          cartItem.product = result.data;
          cartItem.product.total = cartItem.quantity * cartItem.product.Price;
          if (cartItem.quantity > cartItem.product.Quantity) {
            this.checkoutInvalid = true;
          }
        });
        this.cart = tempCart;
      }

    });
  }


  onInputQuantity(quantity: NgModel, max: number) {
    if (this.validateCart()) {
      this.checkoutInvalid = false;
      const cart = JSON.parse(JSON.stringify(this.cart));
      cart.map(cartItem => delete cartItem.product);
      this.cartService.updateCart(cart);
    } else {
      if (!(quantity.value >= 1 && quantity.value <= max)) {
        quantity.control.setErrors({maxMin: `The value must be between 1 and ${max}`});
      }
      this.checkoutInvalid = true;

    }
  }

  checkout() {
    this.cartService.updateCart([]);
    this.cart = []
    this.checkoutDone = true;
  }

  getTotalQuantity() {
    if(this.validateCart() && this.cart) {
      this.cart.map((cartItem: Cart) => cartItem.total = cartItem.quantity * cartItem.product?.Price | 0);
      return this.cart.reduce((previousValue, currentValue) => previousValue + currentValue.total, 0);
    }
  }

  validateCart() {
    return !this.cart? false : !this.cart.reduce(
      (previousValue, currentValue) =>
        previousValue + Number(currentValue.quantity > currentValue.product?.Quantity || currentValue.quantity < 1)
      , 0);

  }

  ngOnDestroy(): void {
    this.cartServiceSubscription.unsubscribe();
  }


}

