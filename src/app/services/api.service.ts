import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private URL = environment.apiUrl; // gunakan environment, bukan hardcode

  constructor(private http: HttpClient) {}

  // =============================
  // Tab 1: Login, Register, Buku Terbaru
  // =============================
  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/login.php`, data)
      .pipe(catchError(this.handleError));
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.URL}/register.php`, data)
      .pipe(catchError(this.handleError));
  }

  daftarBuku(): Observable<any> {
    return this.http.get(`${this.URL}/get_books.php`)
      .pipe(catchError(this.handleError));
  }

  // =============================
  // Tab 2: Pencarian Buku
  // =============================
  cariBuku(keyword: string): Observable<any> {
    return this.http.get(`${this.URL}/search_buku.php?q=${keyword}`)
      .pipe(catchError(this.handleError));
  }

  // =============================
  // Tab 3: Form Peminjaman Buku
  // =============================
  pinjamBuku(data: any): Observable<any> {
    return this.http.post(`${this.URL}/borrow_book.php`, data)
      .pipe(catchError(this.handleError));
  }

  // =============================
  // Tab 4: Riwayat Peminjaman
  // =============================
  riwayat(nim: string): Observable<any> {
    return this.http.get(`${this.URL}/borrow_history.php?nim=${nim}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Riwayat Peminjaman Untuk Admin
  riwayatAdmin(): Observable<any> {
    return this.http.get(`${this.URL}/riwayat_admin.php`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Tambah Buku (Admin)
  tambahBuku(data: any): Observable<any> {
    return this.http.post(`${this.URL}/tambah_buku.php`, data)
      .pipe(catchError(this.handleError));
  }

  // =============================
  // Umum: Akses API Custom
  // =============================
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.URL}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.URL}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  // =============================
  // Penanganan Error
  // =============================
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
