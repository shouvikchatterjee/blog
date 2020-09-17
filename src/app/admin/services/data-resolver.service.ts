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
  fetchUsers(): Observable<any> {
    return this.http.get(this.url);
  }
  /**
   * update user values
   * @param data 
   * @param id 
   */
  updateUsers(data, id): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
