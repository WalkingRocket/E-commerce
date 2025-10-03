import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookiesService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }

  loginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data, {
      observe: 'response',
    });
  }

  logOut(): void {
    this.cookiesService.delete('token');
    this.router.navigate(['home']);
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(this.cookiesService.get('token'));
    } catch (error) {
      this.logOut();
    }
  }

  submitVerifyEmail(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}auth/forgotPasswords`,
      data
    );
  }

  submitVerifyCode(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}auth/verifyResetCode`,
      data
    );
  }

  submitresetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}auth/resetPassword`,
      data
    );
  }
}
