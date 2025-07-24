import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  nim = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    if (!this.nim || !this.password) {
      alert('NIM dan Password wajib diisi!');
      return;
    }

    this.api.login({ nim: this.nim, password: this.password }).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);
        if (res.success) {
          localStorage.setItem('nim', res.nim);
          this.router.navigateByUrl('/tabs/tab1');
        } else {
          alert(res.message || 'Login gagal. Cek NIM dan password.');
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
        const status = err.status;
        const message = err.error?.message || err.message;

        if (status === 0) {
          alert('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
        } else if (status === 401) {
          alert('Login gagal. NIM atau password salah.');
        } else {
          alert(`Terjadi kesalahan: ${message} (Kode: ${status})`);
        }
      }
    });
  }
}
