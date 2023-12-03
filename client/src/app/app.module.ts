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
import { NotificationComponent } from './pages/notification/notification.component';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { StatsComponent } from './pages/stats/stats.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar
import interactionPlugin from '@fullcalendar/interaction'; // Interaction plugin


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
    NotificationComponent,
    MobileNavbarComponent,
    StatsComponent,
    
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
    FullCalendarModule,
    CanvasJSAngularChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
