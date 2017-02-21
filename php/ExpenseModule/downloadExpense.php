<?php
	require_once '../include/DB_Connect.php';

	$id = $_GET['id'];

    if (isset($_GET['id'])) 
    {
    	$sql ="SELECT UploadID FROM Expenses WHERE ID = $id";
        $result = mysqli_query($conn, $sql);
        $row = $result->fetch_assoc();
        $uploadID = $row["UploadID"];
        
        $sql ="SELECT Name, Type, Size, Content FROM Uploads WHERE ID = $uploadID";
        $result = mysqli_query($conn, $sql);
        list($name, $type, $size, $content) = mysqli_fetch_array($result);
        header("Content-length: $size");
		header("Content-type: $type");
		header("Content-Disposition: attachment; filename=$name");
		echo $content;
	}
?>	