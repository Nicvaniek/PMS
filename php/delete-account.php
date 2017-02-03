<?php
    include 'connectDB.php';
    
    $id = $_POST['userId'];

    $sql = "DELETE FROM Users WHERE user_id = '$id'";

    if (!mysqli_query($conn, $sql))
    {
        echo "<div class='alert alert-success'>ERROR". mysqli_error($conn)."</div>";
    }

    $result = mysqli_query($conn, $sql);
    mysqli_close($conn);
?>
