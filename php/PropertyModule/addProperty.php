<?php
	require_once '../include/DB_Connect.php';

    $userID = $_POST['userID'];
    $discription = $_POST['discription'];
    $amount = $_POST['amount'];
    $location = $_POST['location'];

    if (isset($_POST['userID']) && isset($_POST['discription']) && isset($_POST['amount']) && isset($_POST['location']) ) 
    {
        $sql ="INSERT INTO Properties(UserID, Name, PurchaseAmount, HouseNumber, StandSize, CoveredArea, UncoveredArea, Location) VALUES ($userID, '$discription',$amount,0,0,0,0,'$location')";
        mysqli_query($conn, $sql);
	}
?>	
