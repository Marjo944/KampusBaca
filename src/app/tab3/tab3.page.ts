import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  form = {
    nim: '',
    judul_buku: '',
    pengarang: '',
    kode_buku: '',
    tanggal_pinjam: '',
    tanggal_kembali: '',
    catatan: '',
  };

  isSubmitting = false;

  constructor(private api: ApiService) {}

  submitForm() {
    if (this.isSubmitting) return;

    // Validasi field wajib
    if (
      !this.form.nim ||
      !this.form.judul_buku ||
      !this.form.pengarang ||
      !this.form.tanggal_pinjam ||
      !this.form.tanggal_kembali
    ) {
      alert('Harap isi semua field yang wajib.');
      return;
    }

    // Format tanggal sebelum dikirim ke backend
    const payload = {
      ...this.form,
      tanggal_pinjam: this.formatDate(this.form.tanggal_pinjam),
      tanggal_kembali: this.formatDate(this.form.tanggal_kembali),
    };

    this.isSubmitting = true;

    this.api.pinjamBuku(payload).subscribe({
      next: (res) => {
        alert(res.message || 'Peminjaman berhasil!');
        this.form = {
          nim: '',
          judul_buku: '',
          pengarang: '',
          kode_buku: '',
          tanggal_pinjam: '',
          tanggal_kembali: '',
          catatan: '',
        };
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        alert('Terjadi kesalahan saat meminjam buku.');
        this.isSubmitting = false;
      },
    });
  }

  // ✅ Format tanggal ISO ke YYYY-MM-DD
  formatDate(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
