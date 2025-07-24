
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

- **Tab 4 - Tentang Aplikasi dan admin dan upluad buku dan Riwayat**  
  Berisi informasi  upload buku dan riwayat peminjaman buku.

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
| Field    | Tipe         | Keterangan                        |
|----------|--------------|-----------------------------------|
| `id`     | int          | Primary Key (Auto Increment)      |
| `nim`    | varchar(20)  | Unique NIM mahasiswa              |
| `password`| varchar(255)| Password (hashed)                 |

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
```

### `get_tamu.php`
```json
[
  {
    "id": "13",
    "nim": "22040123",
    "judul_buku": "Sistem Operasi",
    "pengarang": "samuel",
    "tanggal_pinjam": "2025-06-10",
    "tanggal_kembali": "2025-06-30",
    "kode_buku": "F012",
    "catatan": "untuk belajar"
  }
]
```

---

## 🔧 Cara Menjalankan Aplikasi

### 1. Clone atau Salin Project
```bash
cd KampusBaca
npm install
```

### 2. Atur API Link di `environment.ts`
```ts
export const environment = {
  production: false,
  apiUrl: 'https://marjo22.ti-zone.io/'
};
```

### 3. Build dan Copy ke Android
```bash
ionic build --prod
npx cap copy
```

### 4. Tambahkan Android Platform (jika belum)
```bash
npm install @capacitor/android
npx cap add android
npx cap open android
```

### 5. Build APK dari Android Studio
- Klik **Build > Build APK(s)**
- Tunggu hingga selesai, lalu klik **Locate**

---

## 🧪 Pengujian Login & Buku Tamu

### Akun Login
- NIM: `22040149`
- Password: (sudah di-hash di database)

### Cek Riwayat Pengunjung
- Via endpoint `get_tamu.php`
- Atau langsung dari Tab 3 di aplikasi

---

## 🧑‍💻 Developer

- **Nama**: [Isikan namamu di sini]
- **Kampus**: [Contoh: Institut Teknologi Bina Ilmu]
- **Tahun**: 2025

---

## 📄 Lisensi

Aplikasi ini dikembangkan sebagai tugas akhir/pembelajaran. Tidak diperkenankan untuk dikomersialkan tanpa izin dari pengembang.

---
