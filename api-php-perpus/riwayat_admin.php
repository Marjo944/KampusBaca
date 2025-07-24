<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

$response = ['success' => false, 'message' => '', 'data' => []];

try {
    $sql = "SELECT judul_buku AS judul, pengarang AS penulis, nim, kode_buku, tanggal_pinjam AS tgl_pinjam, tanggal_kembali AS tgl_kembali, catatan FROM borrowings";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $response['data'][] = $row;
    }

    $response['success'] = true;
    $response['message'] = "Data riwayat berhasil diambil";
} catch (Exception $e) {
    $response['message'] = "Terjadi kesalahan: " . $e->getMessage();
}

echo json_encode($response);
?>
