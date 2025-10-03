import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Products } from '../../core/models/products.interface';
import { ProductsService } from '../../core/services/Products/products.service';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productsList: WritableSignal<Products[]> =signal([]);

  pageSize!: number;
  pageNumber!: number;
  totalProducts!: number;
  text: string = '';

  ngOnInit(): void {
    this.getAllProductsData();
  }

  private readonly productsService = inject(ProductsService);

  getAllProductsData(pageNumber: number = 1): void {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productsList.set( res.data );
        this.pageSize = res.metadata.limit;
        this.pageNumber = res.metadata.currentPage;
        this.totalProducts = res.results;
      },
    });
  }

  pageChanged(numberPage: number): void {
    this.getAllProductsData(numberPage);
  }
}
