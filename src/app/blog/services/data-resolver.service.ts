import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { GlobalService } from '../../core/services/global.service';

@Injectable({
    providedIn: 'root'
})
export class DataResolverService {

    postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    userUrl = `${environment.baseUrl}/users/`;

    constructor(
        private http: HttpClient,
        private globalService: GlobalService) { }

    /**
     * Fetch user posts
     */
    fetchPosts(): Observable<any> {

        const userId = this.globalService.getUserInfo().id;
        const response1 = this.http.get(`${this.postsUrl}?userId=${userId}`);
        const response2 = this.http.get(`${this.userUrl}${userId}`);

        return forkJoin([response1, response2]);
    }

    /**
     * Add New Post
     */
    addPost(data): Observable<any> {
        return this.http.post(`${this.postsUrl}/`, data);
    }

    /**
     * Update New Post
     */
    updatePost(data): Observable<any> {
        return this.http.put(`${this.postsUrl}/${data.id}`, data);
    }

    /**
     * Delete Post
     */
    deletePost(id): Observable<any> {
        return this.http.delete(`${this.postsUrl}/${id}`);
    }
}
