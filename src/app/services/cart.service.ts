import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Cart} from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject(localStorage.cart?JSON.parse(localStorage.cart):[]);

  constructor() {}

  get getCartObservable(): Observable<any> {
    return this.cart.asObservable();
  }

  public findCartInstance(itemId:string): Cart{
    return this.cart.getValue().find((item:Cart)=>item.productId===itemId);
  }

  public removeCartInstance(itemId:string): void{
    const newCart = [...this.cart.getValue()];
    const cartItemIndex = newCart.findIndex((cartItem => cartItem.productId === itemId));
    if(cartItemIndex !== -1) {
      newCart.splice(cartItemIndex, 1)
    }
    this.cart.next(newCart);
    localStorage.cart = JSON.stringify(newCart);
  }

  public addToCart(item: Cart): void {
    const newCart = [...this.cart.getValue()];
    const cartItemIndex = newCart.findIndex((cartItem => cartItem.productId === item.productId));
    if(cartItemIndex !== -1) {
      newCart.splice(cartItemIndex, 1)
    }
    newCart.push(item);
    this.cart.next(newCart);
    localStorage.cart = JSON.stringify(newCart);
  }

  public updateCart(cart: Cart[]) {
    this.cart.next(cart);
    localStorage.cart = JSON.stringify(cart);
  }

}
