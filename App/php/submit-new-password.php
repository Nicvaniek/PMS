<?php
	if(isset($_POST['email']) && isset($_POST['password']))
	{
	  	$email = $_POST['email'];
	  	$pass = $_POST['password'];

	  	// Hash new password
	  	$pass = password_hash($pass, PASSWORD_DEFAULT);

	  	include 'connectDB.php';

        $sql = "UPDATE Users set password='$pass' where md5(email)='$email'";
        $result = mysqli_query($conn, $sql);
	}
	else
	{
		echo "Variables not set";
	}
?>