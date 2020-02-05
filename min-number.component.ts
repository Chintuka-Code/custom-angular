import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-min-number',
  templateUrl: './min-number.component.html',
  styleUrls: ['./min-number.component.css']
})
export class MinNumberComponent implements OnInit {
  low:any;
  sum:any;
 
  constructor() { }

  ngOnInit()
   {
     this.ran(); // call both function when components is load
     this.lowest();
  }

  ran() // this function is for gernating random number
  {
   
     const number = [Math.floor(Math.random()*10)+0,
                    Math.floor(Math.random()*10)+1,
                    Math.floor(Math.random()*10)+1,
                    Math.floor(Math.random()*10)+0,
                    Math.floor(Math.random()*10)+1,
                    Math.floor(Math.random()*10)+2,
                    Math.floor(Math.random()*10)+1,
                    Math.floor(Math.random()*10)+4,
                    Math.floor(Math.random()*10)+1,
                    Math.floor(Math.random()*10)+3,]
      this.low = number;
      console.log("this is random:-"+number);
  }

  lowest() // this method is for sort an array and getting 3 lowest number
  {
    this.low.sort(function(a,b)
    {
      return a-b;
    });
    const first = this.low[0];
    const second = this.low[1];
    const third = this.low[2];
    console.log("first lowest is:-"+first+"\n"+"Second lowest is:-"+second+"\n"+"Second lowest is:-"+third);
    this.sum = first+second+third;
    console.log("Sum of all three lowest number is :-"+this.sum);
  }
}
