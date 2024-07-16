import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url: any = "http://localhost:3000"
  wishCountBS=new BehaviorSubject(0)
  cartCountBS=new BehaviorSubject(0)
  searchkeyBS=new BehaviorSubject("")

  constructor(private http: HttpClient) { 
    if(sessionStorage.getItem('token')){
      this.getWishlistCount()
      this.getCartitemsCount()
    }
  }

  getWishlistCount(){
    this.getWishlistApi().subscribe((res:any)=>{
      this.wishCountBS.next(res.length)
    })
  }
  getCartitemsCount(){
    this.getCartApi().subscribe((res:any)=>{
      this.cartCountBS.next(res.length)
    })
  }


  allProducts() {
    return this.http.get(`${this.base_url}/all-products`)
  }
  getProducts(id: any) {
    return this.http.get(`${this.base_url}/get-product/${id}`)
  }

  userRegisterApi(data: any) {
    return this.http.post(`${this.base_url}/register`, data)
  }
  userLoginApi(data: any) {
    return this.http.post(`${this.base_url}/login`, data)
  }


  //to configure header with token-HttpHeader
  appendTokenToHeader() {
    const token = sessionStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  addWishlisstApi(data: any) {
    return this.http.post(`${this.base_url}/addwish`, data, this.appendTokenToHeader())
  }

  getWishlistApi() {
    return this.http.get(`${this.base_url}/getwish`, this.appendTokenToHeader())
  }

  removeWishlistApi(id: any) {
    return this.http.delete(`${this.base_url}/remwish/${id}`, this.appendTokenToHeader())
  }


  addToCartApi(data: any) {
    return this.http.post(`${this.base_url}/addcart`, data, this.appendTokenToHeader())
  }

  getCartApi() {
    return this.http.get(`${this.base_url}/getcart`, this.appendTokenToHeader())
  }

  removeCartApi(id: any) {
    return this.http.delete(`${this.base_url}/remcart/${id}`, this.appendTokenToHeader())
  }

  incQuantityApi(id: any) {
    return this.http.get(`${this.base_url}/inccart/${id}`, this.appendTokenToHeader())
  }
  decQuantityApi(id: any) {
    return this.http.get(`${this.base_url}/deccart/${id}`, this.appendTokenToHeader())
  }

  emptyCartApi() {
    return this.http.delete(`${this.base_url}/emptycart`, this.appendTokenToHeader())
  }


  isLoggedIn(){
    return !!sessionStorage.getItem('token')
  }

}
