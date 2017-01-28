<?php
	require_once 'include/DB_Connect.php';

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
        echo $_FILES['file']['type'];

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


		$sql = "INSERT INTO Uploads(UserID, Name, Type, Size, Content) VALUES (1, '$fileName', '$fileType', '$fileSize', '$content')";		
        mysqli_query($conn, $sql);

        $sql = "SELECT ID FROM Uploads WHERE UserID = 1 AND Name = '$fileName' AND Type = '$fileType' AND Size = '$fileSize' AND Content = '$content'";		
        $result = mysqli_query($conn, $sql);
        $row = $renovationResult->fetch_assoc();
        echo $row["ID"];
    }

?>