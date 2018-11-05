import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Query } from '../app/Query';

@Injectable({
  providedIn: 'root'
})

export class PylService{

  constructor(private http: HttpClient) { }

  sendNewQuery(query: Query): void{
    this.http.post<Query>('http://localhost:8000/api/newquery', query).subscribe();
  }

  retrieveWordLists(): Observable<String[]>{
    return this.http.get<String[]>('http://localhost:8000/api/lists');
  }
}
