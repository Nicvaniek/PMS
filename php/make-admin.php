<?php
    include 'connectDB.php';
    
    $new = $_POST['newAdmin'];

    $sql = "UPDATE Users SET admin = '1' WHERE user_id = '$new'";

    if (!mysqli_query($conn, $sql))
    {
        echo "<div class='alert alert-success'>ERROR". mysqli_error($conn)."</div>";
    }

    $result = mysqli_query($conn, $sql);
    mysqli_close($conn);
?>