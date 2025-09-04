import { Component, Input } from '@angular/core';
import { Products } from '../../../core/models/products.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input({ required: true }) product: Products = {} as Products;
}
