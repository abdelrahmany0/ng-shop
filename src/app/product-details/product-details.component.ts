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
  quantity:FormGroup
  constructor(private _ProductsService:ProductsService, private _ActivatedRoute:ActivatedRoute, private fb:FormBuilder) { 
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');  
  }
  
 


  getFormData(quantity){
    console.log(quantity);
  }


  ngOnInit(): void {
    this._ProductsService.getProductDetails(this.id).subscribe(data=>{
      this.product=data.data;
      console.log(this.product);
      this.isLoaded=true;
      this.quan=this.product.Quantity;
      
      console.log(this.quan);

      this.quantity=this.fb.group ({
        'quantity_value' : [1,[Validators.required,Validators.min(1),Validators.max(this.quan)]],
      });
    });
   
    
  }
  

}
