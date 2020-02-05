import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url2} from '../url.js';
@Injectable({
  providedIn: 'root'
})
export class Url2reqService {

  constructor(private http:HttpClient) { }

  traveser()
  {
    return this.http.get(`${url2}/data`)
  }
}
