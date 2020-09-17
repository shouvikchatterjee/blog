import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService {

  url = `${environment.baseUrl}/users`;

  constructor(
    private http: HttpClient) { }
  
  /**
   * Fetch existing users
   */
  fetchUser(): Observable<any> {
    return this.http.get(this.url);
  }

  /**
   * Add new user
   * @param payload 
   */
  addUser(payload): Observable<any> {
    return this.http.post(this.url, payload);
  }
}
