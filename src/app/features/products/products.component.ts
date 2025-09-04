import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Products } from '../../core/models/products.interface';
import { ProductsService } from '../../core/services/Products/products.service';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@Component({
  selector: 'app-products',
  imports: [ CardComponent, NgxPaginationModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productsList: Products[] = [];

  pageSize!: number;
  pageNumber!: number;
  totalProducts!: number;

  ngOnInit(): void {
    this.getAllProductsData();
  }

  private readonly productsService = inject(ProductsService);

  getAllProductsData( pageNumber : number = 1): void {
    this.productsService.getAllProducts( pageNumber ).subscribe({
      next: (res) => {
        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.pageNumber = res.metadata.currentPage;
        this.totalProducts = res.results;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}

