<?php
/*Send Mail Function*/
$email = $_POST['email'];
$package = $_POST['package'];

$a = mail('info@property-investor.co.za', "Interesed Customer", "$package \n\n $email", 'From: webmaster@property-investor.co.za');

$b = mail('kyle.erwin24@gmail.com', "Interesed Customer", "$package \n\n $email", 'From: webmaster@property-investor.co.za');
if ($b && $a)
	header("Location: ../");
else 
	echo "mail did not send <br> test failed";
?>