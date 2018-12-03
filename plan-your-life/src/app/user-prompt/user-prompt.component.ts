import { Component, OnInit } from '@angular/core';
import { PylService } from '../planyourlife.service';
import { HttpClient } from '@angular/common/http';
import { Query } from '../Query';
import { Event } from '../Event';
@Component({
  selector: 'app-user-prompt',
  templateUrl: './user-prompt.component.html',
  styleUrls: ['./user-prompt.component.css']
})

export class UserPromptComponent implements OnInit {

  constructor(private pylService: PylService, private http: HttpClient ) { }

  ngOnInit() {
  }

  events: Event[];

  query: Query;

  response: Query;

  logSubmit(){
    console.log("Query Entered successfully.");
  }

  sendQuery(text: string): void{

    var query = new Query();
    query.text = text;
    console.log("Query recieved, " + query);
    this.pylService.sendNewQuery(query);
  }

  getAllLists(): void{
    this.pylService.retrieveWordLists().subscribe(events => this.events = events);
    console.log(this.events);
  }
}
