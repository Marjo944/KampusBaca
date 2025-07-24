# KampusBaca Project

Aplikasi **KampusBaca** adalah aplikasi mobile berbasis **Ionic Framework** (Tabs layout) yang mempermudah pencatatan peminjaman buku perpustakaan oleh mahasiswa, pencatatan koleksi buku, serta aktivitas login admin.

---

## 📱 Fitur Aplikasi

- **Tab 1 - Beranda**  
  Menampilkan banner dan daftar buku dari database, termasuk gambar buku.

- **Tab 2 - Pencatatan Buku**  
  Mahasiswa mengisi formulir data peminjaman: NIM, judul buku, pengarang, tanggal, dan catatan tambahan.

- **Tab 3 - Riwayat**  
  Menampilkan semua data peminjaman buku yang sudah dilakukan.

- **Tab 4 - Tentang & Admin**  
  Berisi informasi aplikasi serta menu **Admin** untuk menambahkan buku baru dan melihat riwayat pinjam

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: Ionic Framework (Angular)
- **Backend**: PHP + MySQL
- **API Hosting**: TI-Zone Hosting
- **Build Android**: Capacitor (`npx cap add/copy android`)

---

## 🗃️ Struktur Database

### Database: `itbi`

#### Tabel: `buku`

| Field       | Tipe          | Keterangan                  |
|-------------|---------------|-----------------------------|
| `id`        | int           | Primary Key (Auto Increment)|
| `judul`     | varchar(255)  | Judul buku                  |
| `gambar`    | varchar(255)  | URL gambar buku             |
| `created_at`| timestamp     | Tanggal upload              |

#### Tabel: `borrowings`

| Field            | Tipe        | Keterangan                  |
|------------------|-------------|-----------------------------|
| `id`             | int         | Primary Key (Auto Increment)|
| `nim`            | varchar(20) | NIM Mahasiswa               |
| `judul_buku`     | varchar(150)| Judul Buku yang dipinjam    |
| `pengarang`      | varchar(100)| Pengarang Buku              |
| `tanggal_pinjam` | date        | Tanggal peminjaman          |
| `tanggal_kembali`| date        | Tanggal kembali (optional)  |
| `kode_buku`      | varchar(50) | Kode Unik Buku              |
| `catatan`        | text        | Catatan tambahan            |

#### Tabel: `users`

| Field     | Tipe         | Keterangan                        |
|-----------|--------------|-----------------------------------|
| `id`      | int          | Primary Key (Auto Increment)      |
| `nim`     | varchar(20)  | NIM Mahasiswa (Unique)            |
| `password`| varchar(255) | Password (hashed)                 |

#### Tabel: `admin`

| Field     | Tipe         | Keterangan                        |
|-----------|--------------|-----------------------------------|
| `id`      | int          | Primary Key (Auto Increment)      |
| `username`| varchar(50)  | Username Admin                    |
| `password`| varchar(255) | Password Admin (hashed)           |

---

## 🌐 API Endpoint

Base URL: `https://marjo22.ti-zone.io/`

| Endpoint API         | Fungsi                                |
|----------------------|----------------------------------------|
| `get_books.php`      | Mengambil daftar buku dari database   |
| `upload_buku.php`    | Admin mengunggah data dan gambar buku |
| `login.php`          | Login pengguna (NIM dan password)     |
| `register.php`       | Registrasi pengguna baru              |

---

## 📦 Contoh Respons JSON

### ✅ `get_books.php`
```json
[
  {
    "id": "11",
    "judul": "Artificial Intelligence",
    "gambar": "https://marjo22.ti-zone.io/uploads/ai.webp.webp",
    "created_at": "2025-06-20 15:35:05"
  }
]
