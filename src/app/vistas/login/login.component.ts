import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api.service'
import { LoginI } from '../../modelos/login.interface'
import { ResponseI } from 'src/app/modelos/response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })

  constructor(private api:ApiService, private router:Router) { }

  errorStatus:boolean = false
  errorMsj:any = ""

  ngOnInit(): void {
    this.chekLocalStorate()
  }

  chekLocalStorate(){
    if(localStorage.getItem('token')){
      this.router.navigate(['principal'])
    }
  }

  onLogin(form:LoginI){
    this.api.loginByEmail(form).subscribe(data => {
      let dataResponse:ResponseI = data;
      if(dataResponse.status == "ok"){
        localStorage.setItem("token",dataResponse.result.token)
        this.router.navigate(['principal'])
      }
      else{
        this.errorStatus = true
        this.errorMsj = dataResponse.result.error_msg
      }
    })
  }

}
