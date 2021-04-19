import { AddToCartService } from './../services/add-to-cart.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm:any;
  selectedProduct:any=[];
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
  constructor(private _ProductsService:ProductsService,
    private _AddToCartService:AddToCartService,

    ) { }
  ngOnInit(): void {
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

  getProducts(){
    this._ProductsService.getAllProducts(this.current,this.limit).subscribe((products:any)=>{
      this.allProducts=products.data;
      this.numOfPages = products.total_pages;
    });
  }
  addToCart(e,id){
    this.productId= id ;
    this.product={
      id:this.productId,
      quantity_value:1
    }
    this.selectedItems=this.product;
    this._AddToCartService.saveSelectedProduct(this.selectedItems);
  }

  setLimit(l){
    this.limit=l;
    this.getProducts();
  }
}
