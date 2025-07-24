import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {
  // 🛡️ Admin Login
  isAdmin: boolean = false;
  showLoginAdmin: boolean = false;
  adminUsername: string = '';
  adminPassword: string = '';

  // 📚 Tambah Buku
  newBook = {
    judul: '',
    gambar: ''
  };
  selectedImageFile: File | null = null;

  // 📑 Riwayat Peminjaman
  riwayatPeminjaman: any[] = [];

  constructor(
    private api: ApiService,
    private storage: Storage,
    private router: Router
  ) {}

  // Saat masuk ke tab 4
  async ionViewWillEnter() {
    await this.storage.create();
    this.isAdmin = (await this.storage.get('isAdmin')) || false;

    if (this.isAdmin) {
      this.loadRiwayat();
    }
  }

  // 🔐 Login Admin
  async loginAdmin() {
    if (this.adminUsername === 'admin' && this.adminPassword === 'admin123') {
      this.isAdmin = true;
      await this.storage.set('isAdmin', true);
      this.adminUsername = '';
      this.adminPassword = '';
      this.showLoginAdmin = false;
      this.loadRiwayat();
    } else {
      alert('Username atau password salah');
    }
  }

  // 🔓 Logout Admin
  async logoutAdmin() {
    this.isAdmin = false;
    this.riwayatPeminjaman = [];
    await this.storage.remove('isAdmin');
  }

  // 🔴 Keluar Aplikasi (langsung ke halaman login)
  async keluarAplikasi() {
    await this.storage.clear();
    this.isAdmin = false;
    this.showLoginAdmin = false;
    this.riwayatPeminjaman = [];
    this.router.navigateByUrl('login', { replaceUrl: true }); // 👉 arahkan ke login
  }

  // 📤 Upload Gambar
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImageFile = file;
    } else {
      alert('Hanya file gambar yang diperbolehkan!');
      this.selectedImageFile = null;
    }
  }

  // ➕ Tambah Buku
  tambahBuku() {
    if (!this.newBook.judul || !this.selectedImageFile) {
      alert('Isi semua field termasuk upload gambar!');
      return;
    }

    const formData = new FormData();
    formData.append('judul', this.newBook.judul);
    formData.append('gambar', this.selectedImageFile);

    this.api.tambahBuku(formData).subscribe({
      next: (res) => {
        alert(res.message || 'Buku berhasil ditambahkan!');
        this.newBook = { judul: '', gambar: '' };
        this.selectedImageFile = null;
      },
      error: (err) => {
        console.error('Tambah buku error:', err);
        alert('Gagal menambahkan buku');
      }
    });
  }

  // 📥 Load Riwayat Peminjaman
  loadRiwayat() {
    this.api.riwayatAdmin().subscribe({
      next: (res) => {
        this.riwayatPeminjaman = res.data || [];
      },
      error: (err) => {
        console.error('Load riwayat error:', err);
        alert('Gagal memuat riwayat');
      }
    });
  }
}
