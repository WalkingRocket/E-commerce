import { Component, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartDetails: Cart = {} as Cart;

  private readonly cartService = inject(CartService);

  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(res.data);
      }
    });
  }

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  removeProductFromCart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.cartService.countNumber.set(res.numOfCartItems);
      },
    });
  }

  updateProductCount(id: string, count: number): void {
    this.cartService.updateProductCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
    });
  }
}
