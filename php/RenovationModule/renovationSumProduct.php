<?php
    session_start();
    require_once '../include/DB_Connect.php';
    $sql ="SELECT SUM(`Cost` * `Quantity`) SumProduct FROM Renovations WHERE PropertyID = " . $_GET['id'];
    $result = mysqli_query($conn, $sql);
    $sumproduct = $result->fetch_assoc();
?>
    <strong>R <?php echo $sumproduct['SumProduct'] ?></strong>
