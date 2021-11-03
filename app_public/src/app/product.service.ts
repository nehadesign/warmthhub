import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from './app.constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${AppConstants.API_URL}product`);
  }

  getProductByCategory(category: string) {
    return this.http.get<any>(`${AppConstants.API_URL}product/category/${category}`);
  }
 
  getProductByName(name: string) {
    return this.http.get<any>(`${AppConstants.API_URL}product/search/${name}`);
  }
}