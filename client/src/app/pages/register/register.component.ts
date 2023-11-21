import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router){
    this.registerForm = this.fb.group({
      name: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role: ['customer', Validators.required]
    })
  }

  handleRegister(){
    this.api.registerUser(this.registerForm.value).subscribe((res: User) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.api.isUserLoggedIn = true;
      this.router.navigate(['/']);
    })
  }
}
