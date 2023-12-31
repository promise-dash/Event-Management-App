import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { EventsComponent } from './pages/events/events.component';
import { EditComponent } from './pages/edit/edit.component';
import { AuthGuard } from './guards/auth.guard';
import { BookedComponent } from './pages/booked/booked.component';
import { UsersComponent } from './pages/users/users.component';
import { RoleGuard } from './guards/role.guard';
import { AdminGuard } from './guards/admin.guard';
import { NotificationComponent } from './pages/notification/notification.component';
import { StatsComponent } from './pages/stats/stats.component';
import { VirtualComponent } from './pages/virtual/virtual.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "details/:id", component: DetailsComponent, canActivate: [AuthGuard], pathMatch: "prefix"},
  {path: "create", component: CreateComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: "events/:id", component: EventsComponent, canActivate: [AuthGuard]},
  {path: "edit/:id", component: EditComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: "booked/:userId", component: BookedComponent, canActivate: [AuthGuard]},
  {path: "users", component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: "notifications", component: NotificationComponent, canActivate: [AuthGuard]},
  {path: "stats", component: StatsComponent, canActivate: [AuthGuard]},
  {path: "virtual", component: VirtualComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
