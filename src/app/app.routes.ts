import { NotFoundComponent } from './features/not-found/not-found.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login Page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register Page',
      },
      {
        path: 'resetPassword',
        loadComponent: () =>
          import('./core/auth/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent
          ),
        title: 'reset Password Page',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart Page',
        canActivate: [authGuard],
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products Page',
        canActivate: [authGuard],
      },
      {
        path: 'brands',
        loadComponent: () => import('./features/brands/brands.component').then(c => c.BrandsComponent),
        title: 'Brands Page',
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/categories/categories.component').then(c => c.CategoriesComponent),
        title: 'Categories Page',
        canActivate: [authGuard],
      },
      {
        path: 'allorders',
        loadComponent: () => import('./features/allorders/allorders.component').then(c => c.AllordersComponent),
        title: 'Allorders Page',
        canActivate: [authGuard],
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () => import('./features/details/details.component').then(c => c.DetailsComponent),
        title: 'Details Page',
        canActivate: [authGuard],
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./features/details/details.component').then(c => c.DetailsComponent),
        title: 'Details Page',
        canActivate: [authGuard],
      },
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        title: 'Checkout Page',
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
