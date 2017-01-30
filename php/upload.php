<?php
	require_once 'include/DB_Connect.php';

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);

        $fileName = $_FILES['file']['name'];
		$tmpName  = $_FILES['file']['tmp_name'];
		$fileSize = $_FILES['file']['size'];
		$fileType = $_FILES['file']['type'];

        $fp      = fopen($tmpName, 'r');
		$content = fread($fp, filesize($tmpName));
		$content = addslashes($content);
		fclose($fp);

		if(!get_magic_quotes_gpc())
		{
		    $fileName = addslashes($fileName);
		}

		date_default_timezone_set("Africa/Johannesburg");
		$timestamp = "" . date("Y-m-d") . " " . date("h:i:sa");


		$sql = "INSERT INTO Uploads(UserID, Name, Type, Size, Content, Timestamp) VALUES (1, '$fileName', '$fileType', '$fileSize', '$content', '$timestamp')";		
        mysqli_query($conn, $sql);

        $sql = "SELECT ID FROM Uploads WHERE UserID = 1 AND Name = '$fileName' AND Size = $fileSize AND Timestamp = '$timestamp'";		
        //echo $sql;
        $result = mysqli_query($conn, $sql);
        $row = $result->fetch_assoc();
        echo $row["ID"];
    }

?>