import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logForm=this.fb.group({
    email:[' ',[Validators.required,Validators.email]],
    password:[' ',[Validators.required,Validators.minLength(4),Validators.maxLength(10),Validators.pattern('[a-zA-Z@_0-9]*')]]
  })
  constructor(private fb:FormBuilder ,private api:ApiService , private router:Router,private toastr:ToastrService){
  }

  handleSubmit(){
    console.log(this.logForm.value);
    this.api.userLoginApi(this.logForm.value).subscribe({
      next:(res:any)=>{
        this.toastr.success("Loginsuccessfull...")
        sessionStorage.setItem('userdetails',JSON.stringify(res.existingUser))
        sessionStorage.setItem('token',res.token)
        this.logForm.reset()
        this.router.navigateByUrl("")
        console.log(res);
        this.api.getWishlistCount()
        this.api.getCartitemsCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
    
  }
}
