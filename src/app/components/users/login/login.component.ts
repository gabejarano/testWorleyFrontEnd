import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";

  constructor(private userService:UsersService, private router:Router){}

  ngOnInit(): void {
    
  }


  loginUser(){
    let login = {
      email: this.email,
      password: this.password
    }
    this.userService.signin(login).subscribe((res:any)=>{
      this.router.navigate(['statistics'])
    })
  }

}
