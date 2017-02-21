<?php
    session_start();
    require_once '../include/DB_Connect.php';
    $sql ="SELECT * FROM Expenses WHERE PropertyID = " . $_GET['id'] ." ORDER BY InvoiceDate";
    $renovationResult = mysqli_query($conn, $sql);
    $count = 0;
    $propertyID = $_GET['id'];

    if ($renovationResult->num_rows > 0) 
    {
        while($renovationRow = $renovationResult->fetch_assoc()) 
        {
?>
    <tr id='<?php echo $propertyID?>ExpenseTr<?php echo $count?>'>
        <td> <?php echo $renovationRow["Name"]?> </td>
        <td> <?php echo $renovationRow["PaidTo"]?> </td>
        <?php  
        if($renovationRow["UploadID"] > 0)
            echo "<td> Yes </td>";
        else
            echo "<td> No </td>";
        ?>
        
        <td> <?php echo $renovationRow["InvoiceDate"]?> </td>
        <td> R <?php echo$renovationRow["Cost"]?> </td>
        <td> <?php echo $renovationRow["Quantity"]?> </td>
        <td> R <?php echo ($renovationRow["Cost"] * $renovationRow["Quantity"]) ?> </td>
        <td> <?php echo $renovationRow["Occurrence"]?> </td>
        <td>
            <div>
                <input class='with-gap' name='group2' type='radio' id='<?php echo $propertyID?>ExpenseRadio<?php echo $count?>' value='<?php echo $renovationRow["ID"] ?>'/>
                <label for='<?php echo $propertyID?>ExpenseRadio<?php echo $count++?>'></label>
            </div>
        </td>
    </tr>
    
<?php 
        }?>
    <tr>
        <td><strong>---</strong></td>
        <td><strong>---</strong></td>
        <td><strong>---</strong></td>
        <td><strong>---</strong></td>
        <td><strong>---</strong></td>
        <td><strong>---</strong></td>
        <?php $sql ="SELECT SUM(`Cost` * `Quantity`) SumProduct FROM Renovations WHERE PropertyID = " . $_GET['id'];
            $result = mysqli_query($conn, $sql);
            $sumproduct = $result->fetch_assoc()
        ?>
        <td id="<?php echo $propertyID?>ExpenseSumProduct"><strong>R <?php echo $sumproduct['SumProduct'] ?></strong></td>
        <td><strong>---</strong></td>
    </tr>
    <script> localStorage.setItem("<?php echo $propertyID?>Expensemax", <?php echo $count?>); </script>
<?php 
    }?>
