import { Component, OnInit } from '@angular/core';
import {Url2reqService} from '../../service/url2req.service'
@Component({
  selector: 'app-traverse',
  templateUrl: './traverse.component.html',
  styleUrls: ['./traverse.component.css']
})
export class TraverseComponent implements OnInit {

  constructor(private u2:Url2reqService) { }

  info()
  {
    this.u2.traveser()
    .subscribe(res=>
      {
        console.log(res);
      })
  }

  ngOnInit() {

    this.info();
  }

}
