import { Component, OnInit } from '@angular/core';
import {FetchCartItemService} from '../../service/fetch-cart-item.service'
import { JsonPipe } from '@angular/common';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RemoveCartItemService } from '../../service/remove-cart-item.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  tp: number=0;
  cart_response;
  cart_data;
  remove_response;
  data;
  inner;
  total;
  carttprice:FormGroup
 
  constructor(private cart_item:FetchCartItemService,
              private fb:FormBuilder,private remove:RemoveCartItemService) { }

 

  cart()
  {
   const email= localStorage.getItem('email');
   if(email==null)
   {
    Swal.fire({
      icon: 'error',
      title: 'Oops!...',
      text: 'Email Not Found',
      footer:'Logout and then Login'
    });
   }
   else{

   this.cart_item.fetch_cart(email)
   .subscribe(res=>
    {
      this.cart_response=res;
      if(this.cart_response.err=='404')
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: 'Empty Cart',
          footer:'Add Some Books'
        });
      }
      else
      {
        this.cart_data=this.cart_response.data;
      //  console.log(this.cart_data);
        this.cart_data.forEach(j => {
          this.tp+=Number(j.current_price);
       //   console.log(j.current_price);
        });
      //  console.log(this.tp);
        document.getElementById("gtsc").innerHTML=  "" +this.tp;
      }
     
})
   }
  }
    
  //qsc+j is dynamic id
//  increase and  decrease function
uprice(j){
  this.tp+=(this.cart_data[j].current_price)*1;
  document.getElementById("qsc"+j).innerHTML=  "" +( Number(document.getElementById('qsc'+j).textContent)+1);
  document.getElementById("gtsc").innerHTML="$"+this.tp;
 // console.log(document.getElementById("gtsc").innerHTML);
       }
  dprice(j){
  
  if(!(document.getElementById('qsc'+j).textContent =="1" )){
  
  this.tp-=(this.cart_data[j].current_price)*1;
  
  document.getElementById("qsc"+j).innerHTML=  "" +( Number(document.getElementById('qsc'+j).textContent)-1);
  document.getElementById("gtsc").innerHTML="$"+this.tp;
 // console.log(document.getElementById("gtsc").innerHTML);
        }
        else{ Swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: 'To remove item use remove button',
          footer:'Use Another Email'
        });}
      }


      remove_item(id)
      {
        this.remove.auth_user(id)
        .subscribe(res=>
          {
            this.remove_response = res;
            if(this.remove_response.err=='404')
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops!...',
                text: 'Something is wrong',
                footer:'Logout and then Login'
              });

            }
            else
            {
              Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'remove item',
                              });
              location.reload();
            }
          })
      }

      set_data()
      {
        const setitem = JSON.stringify(this.cart_data);
        this.total = this.tp;
        localStorage.setItem('data',setitem);
        localStorage.setItem('value',this.total);
      }

  ngOnInit()
  {
    this.cart();
    this.valid();
  }
  valid()
  {
    this.carttprice = this.fb.group(
      {
        'quantity':['',[Validators.required,Validators.pattern('[0-9]*')]],
      }
    )
  }

}
