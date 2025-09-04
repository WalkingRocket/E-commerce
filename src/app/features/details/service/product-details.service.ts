import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private readonly httpClient = inject(HttpClient);

  getProductById(id: string | null) {
    return this.httpClient.get(environment.baseUrl + `products/${id}`);
  }
}
