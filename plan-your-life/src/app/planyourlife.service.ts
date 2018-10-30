import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PylService{

  constructor(private http: HttpClient) { }

  sendNewQuery(query: String): void{
    this.http.post<String>('http://localhost:8000/api/newquery', query).subscribe();
  }

  retrieveWordLists(): Observable<String[]>{
    return this.http.get<String[]>('http://localhost:8000/api/lists');
  }
}
