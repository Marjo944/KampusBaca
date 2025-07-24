<?php
// Header CORS & JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Debug saat development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Koneksi ke database
include 'db.php';

if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Gagal koneksi database: ' . $conn->connect_error
    ]);
    exit();
}

// Ambil data buku
$sql = "SELECT id, judul, gambar FROM buku ORDER BY id DESC";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        'success' => false,
        'message' => 'Query error: ' . $conn->error
    ]);
    exit();
}

$data = [];
$base_url = 'http://localhost/api-php-perpus/uploads/'; // Ganti saat hosting nanti

while ($row = $result->fetch_assoc()) {
    // Normalisasi URL gambar
    if (!preg_match('/^https?:\/\//', $row['gambar'])) {
        $row['gambar'] = $base_url . basename($row['gambar']);
    }
    $data[] = $row;
}

// Output data buku
echo json_encode($data);
$conn->close();
exit();
?>
