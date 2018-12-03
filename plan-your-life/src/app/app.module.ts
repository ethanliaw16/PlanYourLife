import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserPromptComponent } from './user-prompt/user-prompt.component';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserPromptComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
construcor(){} }
