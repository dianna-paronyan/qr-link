import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QrService} from "../../core/services/qr.service";
import {LoadingComponent} from "../../shared/components/loading/loading.component";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    LoadingComponent,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss'
})
export class QrComponent implements OnInit{
  randomImageUrl: string = '';
  qrImageUrl: string | null = null;
  private inputChange$ = new Subject<string>();

  constructor(private apiService: QrService) {
  }

  ngOnInit(): void {
    this.fetchRandomImageAndGenerateQR();

    this.inputChange$.pipe(debounceTime(500)).subscribe((newValue: any) => {
      this.qrImageUrl = this.apiService.getQRCodeUrl(newValue);
    });
  }

  fetchRandomImageAndGenerateQR(): void {
    this.apiService.getRandomUserImage().subscribe({
      next: (imageUrl: string) => {
        this.randomImageUrl = imageUrl;
        this.updateQRCode();
      },
      error: () => {
        alert('Failed to fetch random image!');
      },
    });
  }

    updateQRCode(): void {
      if (!this.randomImageUrl.trim()) {
      this.qrImageUrl = null;
      return;
    }
    this.inputChange$.next(this.randomImageUrl);
  }

  copyLink(): void {
    if (!this.randomImageUrl) return;
    navigator.clipboard.writeText(this.randomImageUrl).then(
      () => alert('Link copied to clipboard!'),
      () => alert('Failed to copy link!')
    );
  }

  save(): void {
    alert('Save action triggered!');
  }

  deleteChanges(): void {
    this.randomImageUrl = '';
    this.qrImageUrl = '';
  }
}
