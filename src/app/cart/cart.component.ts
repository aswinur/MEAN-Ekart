import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems:any=[]
  cartTotal:any=0
  coupenStatus:Boolean=false
  coupenChechStatus:Boolean=false
  constructor(private api:ApiService, private toastr:ToastrService,private router:Router){}

  ngOnInit(): void {
    this.api.getCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.cartItems=res
        this.getTotalAmount()
      },
      error:(err:any)=>{
        console.log(err);     
      }
    })
  }

  deleteItem(id:any){
    this.api.removeCartApi(id).subscribe({
      next:(res:any)=>{
        this.toastr.success(res)
        this.ngOnInit()
        this.api.getCartitemsCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
        
      }
    })
  }

  incQuantity(id:any){
    this.api.incQuantityApi(id).subscribe({
      next:(res:any)=>{
        this.toastr.success(res)
        this.ngOnInit()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error(err.error) 
      }
    })
  }
  decQuantity(id:any){
    this.api.decQuantityApi(id).subscribe({
      next:(res:any)=>{
        this.toastr.success(res)
        this.ngOnInit()
        this.api.getCartitemsCount()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error(err.error) 
      }
    })
  }

  emptyCart(){
    this.api.emptyCartApi().subscribe({
      next:(res:any)=>{
        this.toastr.success(res)
        this.ngOnInit()
        this.api.getCartitemsCount()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error(err.error)
      }
    })
  }

  getTotalAmount(){
    this.cartTotal=Math.ceil( this.cartItems.map((item:any)=>item.totalPrice).
    reduce((t1:any,t2:any)=>t1+t2))
  }

  offerClick(){
    this.coupenStatus=true
  }

  discount50(){
    this.coupenChechStatus=true
    const discount=Math.ceil(this.cartTotal*0.5)
    this.cartTotal-=discount
  }
  discount20(){
    this.coupenChechStatus=true
    const discount=Math.ceil(this.cartTotal*0.2)
    this.cartTotal-=discount
  }
  discount5(){
    this.coupenChechStatus=true
    const discount=Math.ceil(this.cartTotal*0.05)
    this.cartTotal-=discount
  }

  checkOut(){
    sessionStorage.setItem('cartTotal',this.cartTotal)
    this.router.navigateByUrl('/check')
  }

}
