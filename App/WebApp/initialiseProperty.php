<?php 
require_once 'DB_Connect.php';

$UserID = 1;
$sql ="SELECT * FROM Properties WHERE UserID = " . $UserID;
$result = mysqli_query($conn, $sql);

$rows = array();
if ($result->num_rows > 0) 
{
    while($row = $result->fetch_assoc()) 
    {
		array_push($rows, $row);
    }
}

echo json_encode($rows);

?>