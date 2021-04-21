import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import{FormGroup,FormBuilder, Validators} from '@angular/forms';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  isLoaded:boolean=false
  product:any;
  id:any;
  quan:number;
  quantity:FormGroup;
  selectedProduct:any=[];
  constructor(private _ProductsService:ProductsService,
    private _ActivatedRoute:ActivatedRoute,
    private fb:FormBuilder,
    private cartService:CartService) {
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
  }


  onSubmit(form: FormGroup){
    console.log('dddddddddddddd');

    console.log(form);
    this.selectedProduct = form.value;
    console.log(this.selectedProduct);
    this.cartService.addToCart(this.selectedProduct);
  }


  ngOnInit(): void {
    this._ProductsService.getProductDetails(this.id).subscribe(data=>{
      this.product=data.data;
      // console.log(this.product);
      this.isLoaded=true;
      this.quan=this.product.Quantity;

      // console.log(this.quan);
      this.submittedForm();

    });
  }


  isInCart(itemId){
    return this.cartService.findCartInstance(itemId);
  }

  removeFromCart(itemId){
    this.cartService.removeCartInstance(itemId)
  }
  
  submittedForm(){
    this.quantity=this.fb.group ({
      productId:[this.product.ProductId],
      quantity : [1,[Validators.required,Validators.min(1),Validators.max(this.quan)]],
    });
  }

}
