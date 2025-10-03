import { CartService } from '../cart/services/cart.service';
import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  userOrders: orders[] = [];

  getUserID() {
    return this.authService.decodeToken(
      this.authService.decodeToken('token')?.id
    );
  }

  getUserOrders() {
    return this.cartService.getUserOrders(this.getUserID().id).subscribe({
      next: (res) => {
        this.userOrders = res; // not res.data
        console.log(this.userOrders);
      }
    });
  }

  trackByOrderId(index: number, order: any) {
    return order._id;
  }

  trackByItemId(index: number, item: any) {
    return item._id;
  }

  ngOnInit(): void {
    this.getUserOrders();
    console.log(this.getUserID());
  }
}
