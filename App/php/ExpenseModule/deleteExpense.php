<?php
	require_once '../include/DB_Connect.php';

	$id = $_POST['id'];

    if (isset($_POST['id'])) 
    {
        $sql ="DELETE FROM Expenses WHERE ID = $id";
        mysqli_query($conn, $sql);
        echo $sql;
	}
?>	
