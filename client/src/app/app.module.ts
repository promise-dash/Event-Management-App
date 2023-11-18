import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from './components/loader/loader.component';
import {CloudinaryModule} from '@cloudinary/ng';
import { EventsComponent } from './pages/events/events.component';
import { EditComponent } from './pages/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './components/view/view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { BookedComponent } from './pages/booked/booked.component';
import { UsersComponent } from './pages/users/users.component';
import { FeedbackComponent } from './components/feedback/feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DetailsComponent,
    CreateComponent,
    SidebarComponent,
    CardComponent,
    WidgetsComponent,
    LoaderComponent,
    EventsComponent,
    EditComponent,
    ViewComponent,
    BookedComponent,
    UsersComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CloudinaryModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
