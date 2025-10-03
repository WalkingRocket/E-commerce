import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { InputComponent } from "../../../shared/components/input/input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  initiateForm(): void {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])/)]),
        rePassword: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),
      },
      { validators: this.ConfirmPassword }
    );
  }

  ngOnInit(): void {
    this.initiateForm();
  }

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cd = inject(ChangeDetectorRef);

  msgError: string = '';
  isLoading: boolean = false;
  showPassword: boolean = true;
  subscription : Subscription = new Subscription();

  ConfirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ notSame: true });
      return { notSame: true };
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.subscription.unsubscribe();
      this.subscription = this.authService.registerForm(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            this.msgError = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
          this.cd.markForCheck(); // ✅ schedule update
        },
        error: (error) => {
          this.msgError = error.error.message;
          this.isLoading = false;
          this.cd.markForCheck(); // ✅ schedule update
        },
      });
    } else {
      this.registerForm.setErrors({ notSame: true });
      this.registerForm.markAllAsTouched();
    }
  }
}
