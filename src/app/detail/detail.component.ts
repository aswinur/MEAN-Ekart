import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{

  pid:any=""
  product:any=""
  constructor(private ar :ActivatedRoute, private api :ApiService , private toastr:ToastrService){
    this.ar.params.subscribe((res:any)=>{
      console.log(res);
      this.pid=res.id 
    })
  }
  ngOnInit(): void {
    this.api.getProducts(this.pid).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.product=res
      },
      error:(err:any)=>{
        console.log(err)        
      }
    })
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
}
