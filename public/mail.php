<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get raw POST data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = strip_tags(trim($data["name"]));
    $phone = strip_tags(trim($data["phone"]));
    $email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
    $service = strip_tags(trim($data["service"]));
    $message = strip_tags(trim($data["message"]));

    // Replace with your actual email address
    $to = "info@bcmedya.com"; 
    $subject = "Yeni İletişim Formu Mesajı: $name";

    $email_content = "Ad Soyad: $name\n";
    $email_content .= "Telefon: $phone\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Hizmet: $service\n\n";
    $email_content .= "Mesaj:\n$message\n";

    $headers = "From: $name <$email>";

    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Mesajınız başarıyla gönderildi."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Mesaj gönderilirken bir hata oluştu."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["message" => "Bu işlem yasaktır."]);
}
?>
