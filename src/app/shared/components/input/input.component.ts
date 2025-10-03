import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control: any;
  @Input() typeInput!: string;
  @Input() labelInput!: string;
  @Input() idInput!: string;
  @Input() element: string = 'input';

  showPassword: boolean = false;

  get inputType(): string {
    if (this.typeInput && this.typeInput !== 'password') {
      return this.typeInput;
    } else {
      return this.showPassword ? 'text' : 'password';
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
