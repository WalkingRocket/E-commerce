import { Products } from './../../core/models/products.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './service/product-details.service';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);

  id: string | null = null;
  productDetails: Products = {} as Products;

  getProductById(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
       this.id = res.get('id');
    },
    error: (err) => {
      alert(err);
    }
    });
  }

  getProductDetails(): void {
    this.productDetailsService.getProductById(this.id).subscribe({
      next: (res: any) => {
        this.productDetails = res.data;
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  ngOnInit(): void {
    this.getProductById();
    this.getProductDetails();
  }

}
