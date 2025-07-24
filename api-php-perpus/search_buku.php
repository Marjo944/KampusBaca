<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$response = ['success' => false, 'message' => '', 'data' => []];

$q = isset($_GET['q']) ? trim($_GET['q']) : '';

if ($q === '') {
    $response['message'] = "Kata kunci kosong";
    echo json_encode($response);
    exit;
}

// ✅ Query hanya ke kolom `judul`
$stmt = $conn->prepare("SELECT judul FROM buku WHERE judul LIKE ?");
$like = "%$q%";
$stmt->bind_param("s", $like);
$stmt->execute();
$result = $stmt->get_result();

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

if (count($books) > 0) {
    $response['success'] = true;
    $response['message'] = "Ditemukan " . count($books) . " buku";
    $response['data'] = $books;
} else {
    $response['message'] = "Tidak ada hasil ditemukan";
}

echo json_encode($response);
?>
