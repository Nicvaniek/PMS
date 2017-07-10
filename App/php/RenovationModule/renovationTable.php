<?php
    session_start();
    require_once '../include/DB_Connect.php';
    $sql ="SELECT * FROM Renovations WHERE PropertyID = " . $_GET['id'] ." ORDER BY InvoiceDate";
    $renovationResult = mysqli_query($conn, $sql);
    $count = 0;
    $propertyID = $_GET['id'];

    if ($renovationResult->num_rows > 0) 
    {
        while($renovationRow = $renovationResult->fetch_assoc()) 
        {
?>
    <tr id='<?php echo $propertyID?>RenovationTr<?php echo $count?>'>
        <td> <?php echo $renovationRow["Name"]?> </td>
        <td> <?php echo $renovationRow["Supplier"]?> </td>
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
        <td>
            <div>
                <input class='with-gap' name='group2' type='radio' id='<?php echo $propertyID?>RenovationRadio<?php echo $count?>' value='<?php echo $renovationRow["ID"] ?>'/>
                <label for='<?php echo $propertyID?>RenovationRadio<?php echo $count++?>'></label>
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
        <td id="<?php echo $propertyID?>RenovationSumProduct"><strong>R <?php echo $sumproduct['SumProduct'] ?></strong></td>
        <td><strong>---</strong></td>
    </tr>
    <script> localStorage.setItem("<?php echo $propertyID?>Renovationmax", <?php echo $count?>); </script>
<?php 
    }?>
