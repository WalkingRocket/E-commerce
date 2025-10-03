import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Products } from '../../../../core/models/products.interface';
import { ProductsService } from '../../../../core/services/Products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css'],
})
export class PopularProductsComponent implements OnInit {
  productsList: Products[] = [];

  private readonly productsService = inject(ProductsService);
  private readonly cdr = inject(ChangeDetectorRef);

  getAllProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.productsList = res.data;
          this.cdr.detectChanges(); 
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAllProductsData();
  }
}
