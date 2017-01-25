<?php
	require_once 'DB_Connect.php';
    // connecting to database
    $db = new Db_Connect();
    $this->conn = $db->connect();

    if (isset($_POST['renovationName']) && isset($_POST['quantity']) && isset($_POST['cost']) && isset($_POST['supplier']) && isset($_POST['invoiceDate']) && isset($_POST['invoiceFile'])) 
    {
	    // receiving the post params
	    $name = $_POST['renovationName'];
	    $quantity = $_POST['quantity'];
	    $cost = $_POST['cost'];
	    $supplier = $_POST['supplier'];
	    $invoiceDate = $_POST['invoiceDate'];
	    $invoiceFile = $_POST['invoiceFile'];

	    $stmt = $this->conn->prepare("INSERT INTO Renovations(PropertyID, UserID, Name, Cost, Quantity, Supplier, Invoice, InvoiceDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iisdisss", 1, 1, $name, $cost, $quantity, $supplier, $invoiceFile, $invoiceDate);
        $result = $stmt->execute();
        $stmt->close();
	}
?>
