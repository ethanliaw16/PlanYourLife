import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Query } from '../app/Query';
import { Event } from '../app/Event';

@Injectable({
  providedIn: 'root'
})

export class PylService{

  constructor(private http: HttpClient) { }

  sendNewQuery(query: Query): void{
    var response = this.http.post<Query>('http://localhost:8000/api/newquery', query).subscribe();
    console.log('Response: ' + response);
    //return response.unsubscribe;
  }

  retrieveWordLists(): Observable<Event[]>{
    console.log('get events invoked.');
    return this.http.get<Event[]>('http://localhost:8000/api/events');
  }
}
