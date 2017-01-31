<?php
    require_once 'include/DB_Connect.php';

    $name = $_POST['incomeName'];
    $amount = $_POST['amount'];
    $occurrence = $_POST['occurrence'];
    $payee = $_POST['payee'];
    $invoiceDate = $_POST['invoiceDate'];
    $invoiceFile = $_POST['invoiceFile'];

    $propertyID = 1;
    $userID = 1;

    echo $name;
    echo $occurrence;
    echo $amount;
    echo $payee;
    echo $invoiceDate;
    echo $invoiceFile;

    if (isset($_POST['incomeName']) && isset($_POST['occurrence']) && isset($_POST['amount']) && isset($_POST['payee']) && isset($_POST['invoiceDate']) && isset($_POST['invoiceFile'])) 
    {
        $sql ="INSERT INTO Income(PropertyID, UserID, Name, Amount, Occurrence, Payee, Invoice, InvoiceDate) 
        VALUES($propertyID, $userID,'$name', $amount, '$occurrence', '$payee', '$invoiceFile', '$invoiceDate')";
        echo $sql;
        mysqli_query($conn, $sql);
        //echo "Yassss";
	}
?>	