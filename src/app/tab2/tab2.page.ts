import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  keyword: string = '';
  hasilPencarian: any[] = [];
  delayTimer: any;
  pesan: string = '';

  constructor(private api: ApiService) {}

  cariBuku() {
    const trimmedKeyword = this.keyword.trim();

    if (!trimmedKeyword) {
      this.hasilPencarian = [];
      this.pesan = 'Silakan ketik kata kunci pencarian';
      return;
    }

    // ⏱ Debounce 400ms
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.api.cariBuku(trimmedKeyword).subscribe({
        next: (res) => {
          if (res.success) {
            this.hasilPencarian = res.data;
            this.pesan = '';
          } else {
            this.hasilPencarian = [];
            this.pesan = res.message || 'Tidak ada hasil ditemukan';
          }
        },
        error: (err) => {
          console.error('Gagal mencari buku:', err);
          this.hasilPencarian = [];
          this.pesan = 'Terjadi kesalahan saat memuat data';
        },
      });
    }, 400);
  }

  getGambarUrl(filename: string): string {
  return `https://marjo.ti-zone.io/apimarjo/uploads/${filename}`;
  }
}
