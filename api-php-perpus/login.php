<?php

header("Access-Control-Allow-Origin: *"); // izinkan semua domain (bisa dibatasi jika perlu)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // izinkan metode
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // izinkan header
header('Content-Type: application/json');
include 'db.php';
$data = json_decode(file_get_contents("php://input"));

$nim = $data->nim ?? '';
$password = $data->password ?? '';

$stmt = $conn->prepare("SELECT * FROM users WHERE nim = ?");
$stmt->bind_param("s", $nim);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(["success" => true, "message" => "Login berhasil", "nim" => $row['nim']]);
    } else {
        echo json_encode(["success" => false, "message" => "Password salah"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "NIM tidak ditemukan"]);
}
?>