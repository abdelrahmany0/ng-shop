import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm:any;

  allProducts:any []= [];
  constructor(private _ProductsService:ProductsService) { }

  ngOnInit(): void {

    this._ProductsService.getAllProducts().subscribe((products:any)=>{
      this.allProducts=products.data;
    });
  }

}
