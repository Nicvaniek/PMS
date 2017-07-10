<?php
/*Send Mail Function*/
$email = $_POST['email'];
$name = $_POST['name'];
$message = $_POST['mess'];
$phone = $_POST['phone'];
$a = mail('info@property-investor.co.za', "Custom Query - : $name", "$message \n\nName: $name: \nPhone: $phone \nEmail: $email", 'From: webmaster@property-investor.co.za');

$b = mail('kyle.erwin24@gmail.com', "Custom Query - : $name", "$message \n\nName: $name: \nPhone: $phone \nEmail: $email", 'From: webmaster@property-investor.co.za');

if ($b && $a)
	header("Location: ../");
else 
	echo "mail did not send <br> test failed";
?>