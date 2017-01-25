<?php
    $server = "localhost";
    $username = "morning2";
    $password = "cm7RQ73jf9";
    $database = "morning2_PropertyInvestor";
    // Create Connection
    $conn = mysqli_connect($server, $username, $password, $database);
    // Test Connection
    if (!$conn)
    {
        die("Connection Failed: " . mysqli_connect_error());
    }
?>