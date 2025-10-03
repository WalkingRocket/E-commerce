import { Component, inject, Input } from '@angular/core';
import { Products } from '../../../core/models/products.interface';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TermPipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input({ required: true }) product: Products = {} as Products;

  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastr.success(res.message, 'FreshCart');
          this.cartService.countNumber.set (res.numOfCartItems);
        }
      },
    });
  }
}
