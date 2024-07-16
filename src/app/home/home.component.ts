import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = []
  searchkey:any=""
  constructor(private api: ApiService, private toastr: ToastrService) { 
    this.api.searchkeyBS.subscribe((res:any)=>{
      this.searchkey=res
    })
  }


  ngOnInit(): void {
    this.api.allProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  addWish(product: any) {
    if (sessionStorage.getItem('token')) {
      const { id, title, description, category, price, image, rating } = product
      this.api.addWishlisstApi({ id, title, description, category, price, image, rating }).subscribe({
        next: (res: any) => {
          this.toastr.success("Product added to wishlist")
          this.api.getWishlistCount()
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(err.error)
          
        }
      })
    }
    else {
      this.toastr.warning("Please login first")
    }
  }


  addCart(product:any){
    if(sessionStorage.getItem('token')){
      const {id,title,price,image}=product
      this.api.addToCartApi({id,title,price,image}).subscribe({
        next:(res:any)=>{
          this.toastr.success(res)
          this.api.getCartitemsCount()
        },
        error:(err:any)=>{
          console.log(err);
          this.toastr.error(err.error)        
        }
      })
    }
    else{
      this.toastr.warning("Please login first")
    }
  }
}
