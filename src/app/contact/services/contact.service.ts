import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpClient) { }



  addContact(contact){
    return this._http.post(`${environment.baseUrl}/contact_us`,contact)
  }
}
