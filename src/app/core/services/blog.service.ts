import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private apiUrl = 'http://localhost:8080/api/blogs';

    constructor(private http: HttpClient) {}

    getAllBlogs(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    createBlog(payload: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}`, payload);
    }

    updateBlog(id: string, data: FormData) {
        return this.http.put(`${this.apiUrl}/${id}`, data)
    }

    deleteBlog(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}