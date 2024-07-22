import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
