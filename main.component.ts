
import { Component, OnInit } from '@angular/core';
import {BestSellerService} from '../../service/best-seller.service';
import {CartItemService} from '../../service/cart-item.service';
import {WishlistItemService} from '../../service/wishlist-item.service';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
best_response;
best_data;
first_data;
second_data;
third_data;
fourth_data;
cart_response;
  constructor(private best:BestSellerService,
              private cart_item:CartItemService,
              private wishlist_item:WishlistItemService) { }


  /*This function is for show best_seller product */            
  best_seller()
  {
    this.best.best_product()
    .subscribe(res=>
      {
        this.best_response = res;
        this.best_data = this.best_response.cdata;
        let first = [];
        let second = [];
        let third = [];
        let fouth = [];
        this.first_data = first;
        this.second_data = second;
        this.third_data = third;
        this.fourth_data = fouth;

    for ( let i = 0; i < this.best_data.length; i++) 
    {
      if(i<=1)
      {
        first.push(this.best_data[i]);
      }
      if(i>=2&&i<=3)
      {
        second.push(this.best_data[i]);
       
      }
      if(i>=4&&i<=5)
      {
        third.push(this.best_data[i]);
        
      }
      if(i>=6&&i<=7)
      {
        fouth.push(this.best_data[i]);
        
      }
      
    }
      })
      // console.log(this.first_data);
    ;
  }


  /*Add to cart code */
  cart(name,category,price,writer,image)
  {
    if(localStorage.getItem('token')==null)
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: 'Account not Found....',
        footer:'Create Account OR Login'
      });
    }
    else
    {
      const data = {'email':localStorage.getItem('email'),
                    'token':localStorage.getItem('token'),
                    'category':category,
                    'name':name,
                  'price':price,
                'writer':writer,
              'image':image}
      // const g =new FormData();
      // g.append("name",name);
      // // g.append("category",category);
      // g.append("price",price);
      // g.append("writer",writer);
      // g.append('image',image);
      
              
     this.cart_item.cart_save(data)
      .subscribe(res=>
       {this.cart_response = res;
        if(this.cart_response.err=='token_error')
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops!...',
            text: 'Token error....',
            footer:'Logout then login'
          });
        }
        else if(this.cart_response.err==1)
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops!...',
            text: 'Item already in cart....',
            footer:''
          });
        }
        else
        {
          Swal.fire({
            icon: 'success',
           title: 'yeah...',
            text: 'Item add to cart',
          });
        }
       });
    }
        // console.log(res);
    // })
  // }
  
  }

  /*Add to wish list */
  wishlist(id,category)
  {
    if(localStorage.getItem('token')==null)
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: 'Account not Found....',
        footer:'Create Account OR Login'
      });
    }
    else
    {
      const data = {'id':id,'email':localStorage.getItem('email'),
                    'token':localStorage.getItem('token'),'category':category}
      this.wishlist_item.wishlist_save(data)
      .subscribe(res=>
       {
        this.cart_response = res;
        if(this.cart_response.err=='token_error')
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops!...',
            text: 'Token error....',
            footer:'Logout then login'
          });
        }
        else if(this.cart_response.err==1)
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops!...',
            text: 'Item already in wishlist....',
            footer:''
          });
        }
        else
        {
          Swal.fire({
            icon: 'success',
           title: 'Success...',
            text: 'Item add to Wishlist',
          });

        }
       });
      }
    
  }

  quickview(name,price,currentprice,image,writer,edition,published_year)
  {
    localStorage.setItem('qname',name);
    localStorage.setItem('qprice',price);
    localStorage.setItem('qcurrentprice',currentprice);
    localStorage.setItem('qimage',image);
    localStorage.setItem('qwriter',writer);
    localStorage.setItem('qpublished',published_year);
    localStorage.setItem('qedition',edition);
  }

  ngOnInit() {
    this.best_seller();
  }

}
