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

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "details/:id", component: DetailsComponent, canActivate: [AuthGuard]},
  {path: "create", component: CreateComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: "events/:id", component: EventsComponent, canActivate: [AuthGuard]},
  {path: "edit/:id", component: EditComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: "booked/:userId", component: BookedComponent, canActivate: [AuthGuard]},
  {path: "users", component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
