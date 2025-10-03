import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);

  checkOutForm!: FormGroup;

  id: string | null = '';

  initForm() {
    this.checkOutForm = this.fb.group({
      shippingAdress: this.fb.group({
        details: ['', Validators.required],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9][0125][0-9]{8}$/)],
        ],
        city: ['', [Validators.required]],
      }),
    });
  }

  getCartId() {
    return this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });
  }

  submitForm(): void {
    if (this.checkOutForm.valid) {
      console.log(this.checkOutForm.value);
      console.log(this.id);
      this.cartService
        .checkoutSession(this.id!, this.checkOutForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);

            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
        });
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
}
