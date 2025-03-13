import { Component } from '@angular/core';
import {async, Observable} from "rxjs";
import {LoadingService} from "../../../core/services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  loading$!: Observable<boolean>;

  constructor(private loaderService: LoadingService) {
  }

  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
  }
}
