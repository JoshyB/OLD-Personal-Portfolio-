<?php
require 'PHPMailerAutoload.php';
require '../../phpconfig/config.php';

$trap = $_POST['ruse'];

if($trap) {
     die();
} else {

$name = $_POST['name'];
$email = $_POST['email'];
$msg = $_POST['message'];
$address = $username;

$m = new PHPMailer;

$m->isSMTP();
$m->isHTML(true);
$m->SMTPSecure = 'ssl';
$m->SMTPAuth = true;
//$m->SMTPDebug = 2;

$m->Host = 'tls://smtp.gmail.com:587';
$m->Username = $username;
$m->Password = $password;
$m->addAddress($address, $username);

$m->setFrom($email , $name);
$m->addReplyTo($email, $name);
$m->Subject = 'New message from ' . $name;
$m->WordWrap = 50;
$m->Body = $msg;

    if ($m->send()) {
        echo json_encode(42);
    } else {
        echo 'Mailer Error: ' . $m->ErrorInfo;
    }
}
?>