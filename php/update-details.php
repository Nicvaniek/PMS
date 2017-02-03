<?php
    include '../php/connectDB.php';
    
    $cell = $_POST["cellNo"];
    $address = $_POST["address"];
    $province = $_POST["province"];
    $reference = $_POST["reference"];
    $id = $_SESSION['ID'];

    // Update only non-null values
    if (!empty($cell))
    {
        $sql = "UPDATE Users SET cellNumber = '$cell' WHERE Users.user_id = '".$id."'";
        if (!mysqli_query($conn, $sql))
        {
            echo "<div class='alert alert-success'>ERROR". mysqli_error($conn)."</div>";
        }
    }
    if (!empty($address))
    {
        $sql = "UPDATE Users SET address = '$address' WHERE Users.user_id = '".$id."'";
        if (!mysqli_query($conn, $sql))
        {
            echo "<div class='alert alert-success'>ERROR". mysqli_error($conn)."</div>";
        }
    }
    if (!empty($province))
    {
        $sql = "UPDATE Users SET province = '$province' WHERE Users.user_id = '".$id."'";
        if (!mysqli_query($conn, $sql))
        {
            echo "<div class='alert alert-success'>ERROR". mysqli_error($conn)."</div>";
        }
    }
    if (!empty($reference))
    {
        $sql = "UPDATE Users SET reference = '$reference' WHERE Users.user_id = '".$id."'";
        if (!mysqli_query($conn, $sql))
        {
            echo "<div class='alert alert-success'>ERROR". mysqli_error($conn)."</div>";
        }
    }
    mysqli_close($conn);
?>