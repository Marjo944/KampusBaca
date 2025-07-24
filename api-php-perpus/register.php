<?php
header("Access-Control-Allow-Origin: *"); // izinkan semua domain (bisa dibatasi jika perlu)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // izinkan metode
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // izinkan header


require 'db.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

$nim = $data->nim ?? '';
$password = $data->password ?? '';

if (!$nim || !$password) {
    echo json_encode(["success" => false, "message" => "NIM dan Password wajib diisi"]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$check = $conn->prepare("SELECT * FROM users WHERE nim = ?");
$check->bind_param("s", $nim);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "NIM sudah terdaftar"]);
} else {
    $stmt = $conn->prepare("INSERT INTO users (nim, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $nim, $hashed);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Pendaftaran berhasil"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal mendaftar"]);
    }
}
?>