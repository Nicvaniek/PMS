<?php
	echo 'Arrived<>';
	require_once 'include/DB_Connect.php';
	echo 'Required Successfull<>';
    
    echo test($_POST['renovationName']) . "/t";
    echo  test($_POST['quantity']) . "/t";
    echo  test($_POST['cost']) . "/t";
    echo  test($_POST['supplier']) . "/t";
    echo  isset($_POST['invoiceDate']) . "/t";
    echo isset($_POST['invoiceFile']) . "/t<>";


    if (isset($_POST['renovationName']) && isset($_POST['quantity']) && isset($_POST['cost']) && isset($_POST['supplier']) && isset($_POST['invoiceDate']) && isset($_POST['invoiceFile'])) 
    {
    	        echo "HELLLLLLLL YESSSSSS";

	    // receiving the post params
	    $name = $_POST['renovationName'];
	    $quantity = $_POST['quantity'];
	    $cost = $_POST['cost'];
	    $supplier = $_POST['supplier'];
	    $invoiceDate = $_POST['invoiceDate'];
	    $invoiceFile = $_POST['invoiceFile'];
        echo "YEAAAAAAAA YESSSSSS";

	    $stmt = $conn->prepare("INSERT INTO Renovations(PropertyID, UserID, Name, Cost, Quantity, Supplier, Invoice, InvoiceDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iisdisss", 1, 1, $name, $cost, $quantity, $supplier, $invoiceFile, $invoiceDate);
        $result = $stmt->execute();
        $stmt->close();
        echo "FUUUUUCK YESSSSSS";
	}
	echo 'End<>';
?>
