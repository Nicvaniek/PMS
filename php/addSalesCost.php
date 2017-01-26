<?php
	require_once 'include/DB_Connect.php';

	$name = $_POST['salesCostName'];
    $cost = $_POST['cost'];
    $paidTo = $_POST['paidTo'];
    $invoiceDate = $_POST['invoiceDate'];
    $invoiceFile = $_POST['invoiceFile'];

    $propertyID = 1;
    $userID = 1;

	/*echo $name;
    echo $occurrence;
    echo $cost;
    echo $paidTo;
    echo $invoiceDate;
    echo $invoiceFile;*/

    if (isset($_POST['salesCostName']) && isset($_POST['cost']) && isset($_POST['paidTo']) && isset($_POST['invoiceDate']) && isset($_POST['invoiceFile'])) 
    {
        $sql ="INSERT INTO SalesCosts(PropertyID, UserID, Name, Cost, PaidTo, Invoice, InvoiceDate) 
        VALUES($propertyID, $userID,'$name', $cost, '$paidTo', '$invoiceFile', '$invoiceDate')";
        //echo $sql;
        mysqli_query($conn, $sql);
        //echo "Yassss";
	}
?>	
