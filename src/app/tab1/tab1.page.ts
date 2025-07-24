import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  books: any[] = [];

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    this.loadBooks(); // agar data terupdate setiap tab1 dibuka
  }

  loadBooks() {
    this.http.get<any[]>('https://apimarjo.ti-zone.io/get_books.php')
      .subscribe(
        data => {
          this.books = data;
        },
        error => {
          console.error('❌ Gagal mengambil data buku:', error);
        }
      );
  }
}
