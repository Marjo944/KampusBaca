<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Data kosong"]);
    exit;
}

// Ambil dan bersihkan input
$nim = trim($data['nim'] ?? '');
$judul = trim($data['judul_buku'] ?? '');
$penulis = trim($data['pengarang'] ?? '');
$kode_buku = trim($data['kode_buku'] ?? '');
$tanggal_pinjam = trim($data['tanggal_pinjam'] ?? '');
$tanggal_kembali = trim($data['tanggal_kembali'] ?? '');
$catatan = trim($data['catatan'] ?? '');

// Validasi wajib isi
if ($nim === '' || $judul === '' || $penulis === '' || $tanggal_pinjam === '' || $tanggal_kembali === '') {
    echo json_encode(["success" => false, "message" => "Harap isi semua field yang wajib."]);
    exit;
}

// Query simpan
$stmt = $conn->prepare("INSERT INTO borrowings (nim, judul_buku, pengarang, kode_buku, tanggal_pinjam, tanggal_kembali, catatan) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nim, $judul, $penulis, $kode_buku, $tanggal_pinjam, $tanggal_kembali, $catatan);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Peminjaman berhasil disimpan."]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menyimpan data."]);
}

$stmt->close();
$conn->close();
?>
