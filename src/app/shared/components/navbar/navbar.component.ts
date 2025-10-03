import { AuthService } from './../../../core/auth/services/auth.service';
import { Component, computed, inject, Input, Signal, signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}

  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly cartService = inject(CartService);

  @Input({ required: true }) islogin!: boolean;
  count: Signal<number> = computed(() => this.cartService.countNumber());

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.islogin = this.cookieService.check('token');

    if (this.islogin) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this.cartService.countNumber.set(res.numOfCartItems);
        }
      });
    }
  }

  signOut(): void {
    this.authService.logOut();
  }
}
