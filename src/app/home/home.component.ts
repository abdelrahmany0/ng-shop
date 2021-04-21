import { ProductsService } from '../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  cart:Cart[];
  searchTerm:any;
  cartSubscription:Subscription;
  productId:any;
  product:object
  selectedItems:any;
  prev;
  next;
  current=1;
  numOfPages;
  allProducts:any []= [];
  limit:number=10;
  isAdded:boolean = false;
  totalPrice: number;

  constructor(
    private _ProductsService:ProductsService,
    private cartService:CartService,
    ) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartObservable.subscribe((cart:Cart[])=>{
      this.cart=cart
      this.getCartTotalPrice()
    });
    this.getProducts();
  }

  prevPage(){
    if(this.prev<=1){
      this.current=1;
      this.prev=1;
      this.next=this.current+1;
    }else{
      this.current-=1;
      this.next=this.current+1;
      this.prev=this.current-1;
    }
    this.getProducts();
  }

  nextPage(){
    if(this.next>=this.numOfPages){
      this.current=this.numOfPages;
      this.next=this.numOfPages;
      this.prev=this.current-1;
    }else{
      this.current+=1;
      this.next=this.current+1;
      this.prev=this.current-1;
    }
    this.getProducts();
  }

  isInCart(itemId){
    return this.cartService.findCartInstance(itemId);
  }

  removeFromCart(itemId){
    this.cartService.removeCartInstance(itemId)
  }

  getCartTotalPrice(){
    this.totalPrice = 0;
    for(let cartItem of this.cart){
      this._ProductsService.getProductDetails(cartItem.productId).subscribe(result => {
        const product = result.data
        this.totalPrice =  this.totalPrice + (cartItem.quantity * product.Price )
      })
    }
  }

  getProducts(){
    const params = {
      limit: this.limit,
      page: this.current,
      ...(this.searchTerm && {q: this.searchTerm})
    }
    this._ProductsService.getAllProducts(params).subscribe((products:any)=>{
      this.allProducts=products.data;
      this.numOfPages = products.total_pages;
    });
  }

  addToCart(e,id){
    this.productId= id ;
    this.product={
      productId:this.productId,
      quantity:1
    }
    this.selectedItems=this.product;
    this.cartService.addToCart(this.selectedItems);
  }

  setLimit(l){
    this.limit=l;
    this.getProducts();
  }

  ngOnDestroy():void {
    this.cartSubscription.unsubscribe();
  }
}
