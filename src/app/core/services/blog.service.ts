import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private apiUrl = 'http://localhost:8080/api/blogs';

    constructor(private http: HttpClient) {}

    getAllBlogs(
        page: number = 0,
        size: number = 10,
        status?: string,
        category?: string,
        search?: string
    ): Observable<any> {
        let params: any = { page, size };

        if (status) params.status = status;
        if (category) params.category = category;
        if (search) params.search = search;

        return this.http.get<any>(this.apiUrl, {params});
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

    viewBlog(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}/view`);
    }

    filterByStatus(status: string, page = 0, size = 10): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/status/${status}`, {
            params: { page, size }
        });
    }

    filterByCategory(category: string, page = 0, size = 10): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/category/${category}`, {
            params: { page, size }
        });
    }

    search(keyword: string, page = 0, size = 10): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/search`, {
            params: { keyword, page, size }
        });
    }
}