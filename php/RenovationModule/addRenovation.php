<?php
	require_once '../include/DB_Connect.php';

	$name = $_POST['renovationName'];
    $quantity = $_POST['quantity'];
    $cost = $_POST['cost'];
    $supplier = $_POST['supplier'];
    $invoiceDate = $_POST['invoiceDate'];
    $uploadID = $_POST['uploadID'];

    $propertyID = 1;
    $userID = 1;

	/*echo $name;
    echo $quantity;
    echo $cost;
    echo $supplier;
    echo $invoiceDate;
    echo $uploadID;*/

    if (isset($_POST['renovationName']) && isset($_POST['quantity']) && isset($_POST['cost']) && isset($_POST['supplier']) && isset($_POST['invoiceDate']) && isset($_POST['uploadID'])) 
    {
        /*$stmt = $conn->prepare("INSERT INTO 'Renovations'('ID', 'PropertyID', 'UserID', 'Name', 'Cost', 'Quantity', 'Supplier', 'Invoice', 'InvoiceDate') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)");
        echo "YEAAAAAAAA YESSSSSS";
        $stmt->bind_param("iiisdisss", $userID, $propertyID, $userID, $name, $cost, $quantity, $supplier, $uploadID, $invoiceDate);
        echo "YEAAAAAAAA YESSSSSS";*/


        $sql ="INSERT INTO Renovations(PropertyID, UserID, Name, Cost, Quantity, Supplier, InvoiceDate, UploadID) 
        VALUES($propertyID, $userID, '$name', $cost, $quantity, '$supplier', '$invoiceDate', $uploadID)";
        mysqli_query($conn, $sql);
	}
?>	