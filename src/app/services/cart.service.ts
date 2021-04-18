import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject([]);
  constructor() {
    this.cart.next(JSON.parse(localStorage.cart));
  }
  get authCartObservable(): Observable<any> {
    return this.cart.asObservable();
  }
  public addToCart(item: object): void{
    let newCart = [...this.cart.getValue()];
    newCart.push(item)
    this.cart.next(newCart)
    localStorage.cart = JSON.stringify(newCart);
  }
}
