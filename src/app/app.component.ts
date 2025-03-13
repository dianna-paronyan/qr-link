import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {QrComponent} from "./components/qr/qr.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QrComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
