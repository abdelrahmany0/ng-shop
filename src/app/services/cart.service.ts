import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject(localStorage.cart?JSON.parse(localStorage.cart):[]);

  constructor() {}

  get getCartObservable(): Observable<any> {
    return this.cart.asObservable();
  }


  public addToCart(item): void {
    let newCart = [...this.cart.getValue()];
    newCart.push(item);
    this.cart.next(newCart);
    localStorage.cart = JSON.stringify(newCart);
  }

  public updateCart(cart) {
    this.cart.next(cart);
    localStorage.cart = JSON.stringify(cart);
  }

}
