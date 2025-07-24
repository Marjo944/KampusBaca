<?php
// Logging error ke file
ini_set("display_errors", 0);
ini_set("log_errors", 1);
ini_set("error_log", __DIR__ . "/error_log.txt");
error_reporting(E_ALL);

// Header CORS dan JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Koneksi database
$conn = new mysqli("localhost", "root", "", "itbi");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Koneksi database gagal"]);
    exit();
}

// Validasi input
if (!isset($_POST['judul']) || !isset($_FILES['gambar'])) {
    http_response_code(400);
    echo json_encode(["message" => "Judul dan gambar wajib diisi"]);
    exit();
}

$judul = trim($_POST['judul']);

// Folder upload
$targetDir = "uploads/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// 🔐 Amankan nama file
$originalName = strtolower($_FILES["gambar"]["name"]);
$originalName = preg_replace("/[^a-z0-9\._-]/", "_", $originalName);
$filename = uniqid() . "_" . $originalName;
$relativePath = $targetDir . $filename;

// ✅ URL lokal
$baseURL = "http://localhost/api-php-perpus/"; // Gunakan ini saat masih di XAMPP
$fullUrlPath = $baseURL . $relativePath;

// Simpan file & database
if (move_uploaded_file($_FILES["gambar"]["tmp_name"], $relativePath)) {
    $stmt = $conn->prepare("INSERT INTO buku (judul, gambar) VALUES (?, ?)");
    $stmt->bind_param("ss", $judul, $fullUrlPath);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Buku berhasil ditambahkan"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Gagal menyimpan ke database"]);
    }

    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(["message" => "Gagal mengupload gambar"]);
}

$conn->close();
?>
