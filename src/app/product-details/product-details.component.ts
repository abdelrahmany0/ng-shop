import { AddToCartService } from './../services/add-to-cart.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import{FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';

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
    private _AddToCartService:AddToCartService) { 
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');  
  }


  onSubmit(form: FormGroup){
    console.log('dddddddddddddd');
    
    console.log(form);
    this.selectedProduct = form.value;
    console.log(this.selectedProduct);
    this._AddToCartService.saveSelectedProduct(this.selectedProduct);
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
  
  submittedForm(){
    this.quantity=this.fb.group ({
      "id":[this.product.ProductId],
      'quantity_value' : [1,[Validators.required,Validators.min(1),Validators.max(this.quan)]],
    });
  }

}
