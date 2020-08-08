import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  generateLink(host, url, port) {
    return `${host}:${port}${url}`
  }

  setHeaderWithToken() {
    const token = sessionStorage.getItem('token') || ""
    const userCode = sessionStorage.getItem('user_code') || ""
    const sF = sessionStorage.getItem('sF') || ""
    let header = new HttpHeaders();
    header = header.set('Authorisation', 'Bearer ' + token)
    header = header.set('user_code', userCode)
    header = header.set('sF', sF)
    return { headers: header }
  }

  loginAPICall(body) {
    const link = this.generateLink(environment.host, environment.login, environment.port)
    return this.http.post(link, body).pipe(map(res => {
      return Object(res);
    }))
  }


  registerAPICall(body) {
    const link = this.generateLink(environment.host, environment.register, environment.port)
    return this.http.post(link, body).pipe(map(res => {
      return Object(res);
    }))
  }

  forgotPasswordAPICall(body) {
    const link = this.generateLink(environment.host, environment.forgotPassword, environment.port)
    return this.http.post(link, body).pipe(map(res => {
      return Object(res);
    }))
  }


  getAllProducts() {
    const link = this.generateLink(environment.host, environment.allProducts, environment.port)
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  getAllCategoris() {
    const link = this.generateLink(environment.host, environment.getAllCategories, environment.port)
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  getPurchaseHistory() {
    const link = this.generateLink(environment.host, environment.purchaseHistory, environment.port)
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  searchProduct(queryJson) {
    let link = this.generateLink(environment.host, environment.searchproduct, environment.port)
    link += '?' + queryJson
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  addProductToWishlist(body) {
    const link = this.generateLink(environment.host, environment.addToWishlist, environment.port)
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  remvoeProductFromWishlist(body) {
    const link = this.generateLink(environment.host, environment.removeFromWishList, environment.port)
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  getProductById(productId) {
    let link = this.generateLink(environment.host, environment.getProductById, environment.port)
    link = link.replace(':productId', productId)
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  myCartList() {
    let link = this.generateLink(environment.host, environment.myCart, environment.port)
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  addToCart(body) {
    const link = this.generateLink(environment.host, environment.addToCart, environment.port)
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  removeFromCart(favId) {
    let link = this.generateLink(environment.host, environment.removeFromCart, environment.port)
    link = link.replace(':fav_id', favId)
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  myProfile() {
    let link = this.generateLink(environment.host, environment.myProfie, environment.port)
    return this.http.get(link, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  changeProfilePicture(body) {
    const link = this.generateLink(environment.host, environment.changeProfilePicture, environment.port)
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }
  
  uploadFile(body) {
    const link = this.generateLink(environment.host, environment.uploadFile, environment.port)
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  updateProfile(body) {
    let link = this.generateLink(environment.host, environment.updateProfile, environment.port)
    link = link.replace(':user_id', sessionStorage.getItem('user_code'))
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }

  updateAddress(body, addressId) {
    let link = this.generateLink(environment.host, environment.updateAddress, environment.port)
    link = link.replace(':userId', sessionStorage.getItem('user_code'))
    link = link.replace(':addressId', addressId)
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }
  processPayment(body) {
    let link = this.generateLink(environment.host, environment.processPayment, environment.port)
    return this.http.post(link, body, this.setHeaderWithToken()).pipe(map(res => {
      return Object(res);
    }))
  }
}
