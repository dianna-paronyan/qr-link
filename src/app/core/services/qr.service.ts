import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Urls} from "../common/urls";

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http: HttpClient) {}

  getRandomUserImage(): Observable<string> {
    return this.http.get<any>(Urls.USER_API_URL).pipe(
      map((response) => response.results[0]?.picture?.medium || '')
    );
  }

  getQRCodeUrl(text: string): string {
    return `${Urls.QR_API_BASE_URL}?text=${encodeURIComponent(text)}`;
  }
}
