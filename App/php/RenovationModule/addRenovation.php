<?php
	require_once '../include/DB_Connect.php';

    $propertyID = $_POST['propertyID'];
    $userID = $_POST['userID'];
    $name = $_POST['name'];
    $quantity = $_POST['quantity'];
    $cost = $_POST['cost'];
    $supplier = $_POST['supplier'];
    $invoiceDate = $_POST['invoiceDate'];

    $uploadID = 0;

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
        $uploadID = $row["ID"];
    }

    if (isset($_POST['name']) && isset($_POST['propertyID']) && isset($_POST['userID']) && isset($_POST['quantity']) && isset($_POST['cost']) && isset($_POST['supplier']) && isset($_POST['invoiceDate'])) 
    {
        $sql ="INSERT INTO Renovations(PropertyID, UserID, Name, Cost, Quantity, Supplier, InvoiceDate, UploadID) 
        VALUES($propertyID, $userID, '$name', $cost, $quantity, '$supplier', '$invoiceDate', $uploadID)";
        mysqli_query($conn, $sql);
        echo "success";
	}
?>	
