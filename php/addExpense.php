<?php
	require_once 'include/DB_Connect.php';

	$name = $_POST['expenseName'];
    $cost = $_POST['cost'];
    $occurrence = $_POST['occurrence'];
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

    if (isset($_POST['expenseName']) && isset($_POST['occurrence']) && isset($_POST['cost']) && isset($_POST['paidTo']) && isset($_POST['invoiceDate']) && isset($_POST['invoiceFile'])) 
    {
            echo "we oycha here";
        $sql ="INSERT INTO Expenses(PropertyID, UserID, Name, Cost, Occurrence, PaidTo, Invoice, InvoiceDate) 
        VALUES($propertyID, $userID,'$name', '$occurrence', $cost, '$paidTo', '$invoiceFile', '$invoiceDate')";
        echo $sql;
        mysqli_query($conn, $sql);
        echo "Yassss";
	}
?>	
