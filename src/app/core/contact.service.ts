import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private apiUrl = 'http://localhost:8080/api/contact';

    constructor(private http: HttpClient) {}

    sendContact(payload: ContactPayload): Observable<any> {
        return this.http.post(this.apiUrl, payload);
    }
}
