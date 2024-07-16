import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loginStatus:Boolean=false
  user:any=""
  wishCount:any=0
  cartCount:any=0

  constructor(private api:ApiService,private router:Router,private toastr:ToastrService){}

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.loginStatus=true
      const userData=sessionStorage.getItem('userdetails') || ""
      this.user=JSON.parse(userData).username

      this.api.wishCountBS.subscribe((res:any)=>{
        this.wishCount=res
      }) 
      this.api.cartCountBS.subscribe((res:any)=>{
        this.cartCount=res
      }) 
    }
    else{
      this.loginStatus=false
      this.user=""
      this.wishCount=0
      this.cartCount=0
    }
  }

  logout(){
    sessionStorage.removeItem('cartTotal')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userdetails')
    this.toastr.success("Logout successfull")
    this.router.navigateByUrl('/log')
  }

  searchInput(searchkey:any){
    this.api.searchkeyBS.next(searchkey)
  }

}
