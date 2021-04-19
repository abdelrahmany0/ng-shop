import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor() { }
  // saveProduct(){

  // }

  saveSelectedProduct(selectedProduct) {
    let selectedProducts:any [];
    let productIndex : number;
  
    if(localStorage.getItem('selectedProducts')) {
      
      selectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
      console.log(selectedProducts);
      
      if(selectedProducts.some(product => product.id == selectedProduct.id)){
        productIndex = selectedProducts.findIndex((product => product.id === selectedProduct.id));
        selectedProducts[productIndex].quantity_value = selectedProduct.quantity_value;
        console.log('in if');
        console.log(selectedProducts);        
      }else {
        selectedProducts.push(selectedProduct);
      }
    }
    else {
      selectedProducts = [selectedProduct];
      console.log(selectedProducts);
    }
    localStorage.setItem('selectedProducts',JSON.stringify(selectedProducts));
  }
}







