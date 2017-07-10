<?php
require_once 'DB_Connect.php';

$uniqid = time().''.uniqid(true);;
$target_dir = "Uploads/";

$fileName = $uniqid . " - " . basename($_FILES["fileToUpload"]["name"]);
#echo $fileName;
$target_file = $target_dir .  $fileName;

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    #echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";

    $UserID = 1;
    $sql ="INSERT INTO Uploads (UserID, DocumentName) VALUES ($UserID, '$fileName')";

    mysqli_query($conn, $sql);

    $sql ="SELECT * FROM Uploads WHERE  UserID = $UserID AND DocumentName = '$fileName'";
    #echo $sql;
    mysqli_query($conn, $sql);
    $result = mysqli_query($conn, $sql);

	if ($result->num_rows > 0) 
	{
	    $row = $result->fetch_assoc();

	    echo $row['ID'];
	}
}
?>