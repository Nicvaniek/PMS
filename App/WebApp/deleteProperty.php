<?php     
    require_once 'DB_Connect.php';

    $propertyID = json_decode($_POST['propertyID']);

    $sql ="DELETE FROM Properties WHERE ID = $propertyID";
    
    mysqli_query($conn, $sql);
    echo "success";
    ?>