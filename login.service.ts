import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url} from '../url.js';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  logind(data)
  {
    return this.http.post(`${url}/login`,data);
  }

}
