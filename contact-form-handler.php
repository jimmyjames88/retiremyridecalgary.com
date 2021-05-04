<?php
//Import the PHPMailer class into the global namespace
//use PHPMailer\PHPMailer\PHPMailer;
require 'lib/PHPMailer-5.2.26/PHPMailerAutoload.php';

$out = array('error'=>null);
function sendMail($post){

	$body = '';
	foreach($post as $k => $v){
		if(is_array($v)){
			$vOut = implode($v, ', ');
		} else {
			$vOut = $v;
		}

		$body .= '<p><strong>' . ucfirst($k) . ': </strong>' . $vOut . '</p>';

	}

	$mail = new PHPMailer;
	$mail->AddReplyTo($post->email , $post->name);
	$mail->setFrom('noreply@retiremyridecalgary.com');
	$mail->addAddress('me@james-allen.ca');
	$mail->addAddress('retiremyridecalgary@hotmail.com');
	$mail->isHTML(true);
	$mail->Subject = 'Retire My Ride Quote Form';
	$mail->Body = $body;

	return $mail->Send();
}

$post = json_decode(file_get_contents("php://input"));
if (sendMail($post)) {
	echo json_encode(array(
		'status' => 'success'
	));
} else {
	echo json_encode(array(
		'status' => 'failed'
	));
}
?>
