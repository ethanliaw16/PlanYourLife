import { Component, OnInit } from '@angular/core';
import { PylService } from '../planyourlife.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-prompt',
  templateUrl: './user-prompt.component.html',
  styleUrls: ['./user-prompt.component.css']
})

export class UserPromptComponent implements OnInit {

  constructor(private pylService: PylService, private http: HttpClient ) { }

  ngOnInit() {
  }

  Lists: String[];

  query: String;

  logSubmit(){
    console.log("Query Entered successfully.");
  }

  sendQuery(query: String): void{
    console.log("Query recieved, " + query);
    this.pylService.sendNewQuery(query);
  }

  getAllLists(): void{
    this.pylService.retrieveWordLists().subscribe(lists => this.Lists = lists);
  }
}
