import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])/)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),
  }, {validators: this.ConfirmPassword});

  private readonly authService = inject(AuthService);
  msgError: string = '';
  private readonly cdr = inject(ChangeDetectorRef);
  isLoading: boolean = false;

  ConfirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value? null : {notSame: true};
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.isLoading = true;
                console.log(this.isLoading)

      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this.cdr.detectChanges(); // 👈 force update
          console.log('next', this.isLoading);
          if(response.message === 'success') {
              
          }
        },
        error: (error) => {
            this.msgError = error.error.message;
           this.isLoading = false;
          this.cdr.detectChanges(); // 👈 force update
          console.log('error', this.isLoading);

        }
      });
    }
  }
}
