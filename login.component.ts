import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {ConfirmPasswordValidator} from './validation';
import {CreateUserAccountService} from '../../service/create-user-account.service';
import {LoginService} from '../../service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
registation:FormGroup;
login:FormGroup;
response_data;
login_response;

  constructor(private fb:FormBuilder,private create:CreateUserAccountService,
              private router:Router,private log:LoginService) { }

  Register()
  {
    
    const user_data = this.registation.getRawValue();
    localStorage.setItem('data',JSON.stringify(user_data));
    this.create.create_user(user_data)
    .subscribe(res=>
      {
        this.response_data = res;
        if(this.response_data.err==1)
        {
          console.log('not a valid email');
        }
        else
        {
          localStorage.setItem('otp',this.response_data.pin);
          this.router.navigate(['/confirm_email']); 
        }
      })
  }


  Login()
  {
    const token = localStorage.getItem('token');
    if(token==null)
    {
      const login_data = this.login.getRawValue();
      this.log.login(login_data)
      .subscribe(res=>
        {
          this.login_response = res;
          if(this.login_response.err=='404')
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops!...',
              text: 'Account not Found....',
              footer:'Create Account'
            });
          }
          else if(this.login_response.err=='notmatch')
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops!...',
              text: 'PassWord not Match....',
              footer:'Retry'
            });
          }
          else
          {
           localStorage.setItem('token', this.login_response.token);
           localStorage.setItem('email', this.login_response.email);
           Swal.fire({
            icon: 'success',
           title: 'Success...',
            text: 'Login Success',
          });
          this.login.reset();
          this.router.navigate(['/']); 
          }
        }) 
    }

// if you have token then it means your already login
    
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: 'Account already Login....',
        footer:'If your account not working Logout and try again'
      });
    }
  }





  ngOnInit()
  {
    this.validate();
    this.login_validate();
  }



  validate()
  {
    this.registation=this.fb.group(
      {
        'name':['',[Validators.required]],
        'password':['',[Validators.required,Validators.minLength(8)]],
        'confirm_password':['',[Validators.required]],
        'email':['',[Validators.required]],
        'contact':['',[Validators.required,Validators.minLength(10),Validators.pattern('[0-9]*')]],
        'address':['',[Validators.required]],
        'pincode':['',[Validators.required,Validators.pattern('[0-9]*')]],
        'state':['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      },
      {
         validator: ConfirmPasswordValidator.MatchPassword // custom validation
      });
    }



    login_validate()
    {
      this.login = this.fb.group(
        {
          'password':['',Validators.required],
          'contact':['',[Validators.required]],
          'email':['',[Validators.required]]
        }
      )
    }



}
