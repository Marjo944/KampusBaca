# KampusBaca Project

Aplikasi **KampusBaca** adalah aplikasi mobile berbasis **Ionic Framework** (Tabs layout) yang ditujukan untuk mempermudah pencatatan kunjungan mahasiswa ke perpustakaan kampus, menampilkan daftar buku yang tersedia, dan mencatat aktivitas peminjaman buku.

---

## 📱 Fitur Aplikasi

- **Tab 1 - Beranda**  
  Menampilkan banner dan daftar buku beserta gambar dari API.

- **Tab 2 - Pencarian buku**  
  Mahasiswa mengisi formulir: NIM, buku yang dibaca, pengarang, tanggal pinjam, catatan, dll.

- **Tab 3 - Pinjambuku**  
  Menampilkan daftar kunjungan yang telah dilakukan mahasiswa.

- **Tab 4 - Tentang Aplikasi dan Admin**  
  Berisi informasi aplikasi, upload buku (admin), dan riwayat peminjaman buku.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: Ionic Framework + Angular  
- **Backend**: PHP (API)  
- **Database**: MySQL  
- **Mobile Build**: Capacitor (Android APK)

---

## 🗃️ Struktur Database

### Database: `itbi`

#### Tabel: `borrowings`
| Field            | Tipe        | Keterangan                     |
|------------------|-------------|--------------------------------|
| `id`             | int         | Primary Key (Auto Increment)   |
| `nim`            | varchar(20) | NIM Mahasiswa                  |
| `judul_buku`     | varchar(150)| Judul buku                     |
| `pengarang`      | varchar(100)| Pengarang                      |
| `tanggal_pinjam` | date        | Tanggal pinjam                 |
| `tanggal_kembali`| date        | Tanggal kembali (opsional)     |
| `kode_buku`      | varchar(50) | Kode buku                      |
| `catatan`        | text        | Catatan tambahan               |

#### Tabel: `buku`
| Field       | Tipe          | Keterangan                  |
|-------------|---------------|-----------------------------|
| `id`        | int           | Primary Key (Auto Increment)|
| `judul`     | varchar(255)  | Judul buku                  |
| `gambar`    | varchar(255)  | URL gambar                  |
| `created_at`| timestamp     | Tanggal input buku          |

#### Tabel: `users`
| Field     | Tipe         | Keterangan                        |
|-----------|--------------|-----------------------------------|
| `id`      | int          | Primary Key (Auto Increment)      |
| `nim`     | varchar(20)  | Unique NIM mahasiswa              |
| `password`| varchar(255) | Password (hashed)                 |

#### Tabel: `admin`
| Field     | Tipe         | Keterangan                        |
|-----------|--------------|-----------------------------------|
| `id`      | int          | Primary Key (Auto Increment)      |
| `username`| varchar(50)  | Username Admin                    |
| `password`| varchar(255) | Password (hashed)                 |

---

## 🌐 API Endpoint

Base URL: `https://marjo22.ti-zone.io/`

| Endpoint API         | Fungsi                             |
|----------------------|-------------------------------------|
| `get_books.php`      | Mengambil daftar buku dari database |
| `upload_buku.php`    | Mengunggah data buku (admin)        |
| `input_tamu.php`     | Menyimpan data kunjungan tamu       |
| `get_tamu.php`       | Mengambil semua data tamu/riwayat   |
| `login.php`          | Login pengguna berdasarkan NIM      |
| `register.php`       | Registrasi pengguna baru            |

---

## 📋 Contoh Format JSON

### `get_books.php`
```json
[
  {
    "id": "11",
    "judul": "Artificial Intelligence",
    "gambar": "https://marjo22.ti-zone.io/uploads/ai.webp.webp",
    "created_at": "2025-06-20 15:35:05"
  }
]
