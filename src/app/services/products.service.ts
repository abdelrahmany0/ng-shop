import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _HttpClient:HttpClient) { }
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/products`);
  }

  getProductDetails(id):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/products/${id}`);
  }
}
