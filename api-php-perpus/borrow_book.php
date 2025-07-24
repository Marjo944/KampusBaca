<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require 'db.php';

$data = json_decode(file_get_contents("php://input"));

$nim              = $data->nim ?? '';
$judul_buku       = $data->judul_buku ?? '';
$pengarang        = $data->pengarang ?? '';
$tanggal_pinjam   = $data->tanggal_pinjam ?? '';
$tanggal_kembali  = $data->tanggal_kembali ?? '';
$kode_buku        = $data->kode_buku ?? '';
$catatan          = $data->catatan ?? '';

// 🔒 Validasi field wajib
if (
    empty($nim) || empty($judul_buku) || empty($pengarang) ||
    empty($tanggal_pinjam) || empty($tanggal_kembali)
) {
    echo json_encode([
        "success" => false,
        "message" => "Field wajib tidak boleh kosong"
    ]);
    exit;
}

// ✅ Gunakan prepared statement
$stmt = $conn->prepare("INSERT INTO borrowings 
    (nim, judul_buku, pengarang, tanggal_pinjam, tanggal_kembali, kode_buku, catatan) 
    VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nim, $judul_buku, $pengarang, $tanggal_pinjam, $tanggal_kembali, $kode_buku, $catatan);

// 🚀 Eksekusi dan kirim respons
if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Peminjaman berhasil disimpan"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Gagal menyimpan data peminjaman"
    ]);
}
?>
