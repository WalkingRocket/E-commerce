import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, InputComponent, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  step: number = 1;
  Verification: string[] = ['Not Verified', 'Verified'];

  initForm(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });

    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])/
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  formStep1(): void {
    if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
        },
      });
    }
  }

  formStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
        },
      });
    }
  }

    formStep3(): void {
    if (this.resetPassword.valid) {
      this.authService.submitresetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this.cookieService.set('token', res.token)
          this.router.navigate(['/home'])
        },
      });
    }
  }
}
