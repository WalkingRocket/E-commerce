import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriesService } from '../../../../core/services/Categories/categories.service';
import { Category } from '../../../../core/models/products.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.css'],
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly cdr = inject(ChangeDetectorRef);

  categoriesList: Category[] = [];

  CategoriesOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<--', '-->'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.categoriesList = res.data;
          this.cdr.detectChanges();
        });
      }
    });
  }
}
