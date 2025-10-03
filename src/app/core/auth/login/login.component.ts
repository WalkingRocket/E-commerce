import { CookieService } from 'ngx-cookie-service';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])/)]),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookiesService  = inject(CookieService);

  msgError: string = '';
  isLoading: boolean = false;
  subscription : Subscription = new Subscription();

  submitForm(): void {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.isLoading = false;
            this.cookiesService.set('token', response.body.token);
            console.log( this.authService.decodeToken(response.body.token));
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.msgError = error.error.message;
          this.isLoading = false;

          console.log(this.isLoading);
        },
      });
    }
  }
}
