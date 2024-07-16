import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishItems:any=[]
  constructor(private api:ApiService, private toastr:ToastrService){
  }

  ngOnInit() {
    if(sessionStorage.getItem('token')){
      this.api.getWishlistApi().subscribe({
        next:(res:any)=>{
          this.wishItems=res
          console.log(res);          
          console.log(this.wishItems); 
                  
        },
        error:(err:any)=>{
          console.log(err);          
        }
      })
    }
    else{
      console.log("Please login first");     
    }
  }

  removeWishlist(id:any){
    this.api.removeWishlistApi(id).subscribe({
      next:(res:any)=>{
        this.toastr.success("Successfully removed")
        this.ngOnInit()
        this.api.getWishlistCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }

  addCart(product:any){
    if(sessionStorage.getItem('token')){
      const {id,title,price,image}=product
      this.api.addToCartApi({id,title,price,image}).subscribe({
        next:(res:any)=>{
          this.toastr.success(res)
          this.removeWishlist(product._id)
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
