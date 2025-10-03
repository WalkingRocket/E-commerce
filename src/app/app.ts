import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NgxSpinnerComponent } from "ngx-spinner";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // note: it should be style**s**Urls, not styleUrl
})
export class AppComponent {

}
