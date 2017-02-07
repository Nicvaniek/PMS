<?php
    require_once '../include/DB_Connect.php';
    $sql ="SELECT * FROM Renovations WHERE PropertyID = " . $_GET['id'] ." ORDER BY ID";
    $renovationResult = mysqli_query($conn, $sql);
    $count = 0;
    $propertyLocation = $_GET['location'];

    if ($renovationResult->num_rows > 0) 
    {
        while($renovationRow = $renovationResult->fetch_assoc()) 
        {
?>
    <tr id='<?php echo $propertyLocation?>Tr<?php echo $count?>'>
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
                <input class='with-gap' name='group2' type='radio' id='<?php echo $propertyLocation?>Radio<?php echo $count?>' value='<?php echo $renovationRow["ID"] ?>'/>
                <label for='<?php echo $propertyLocation?>Radio<?php echo $count++?>'></label>
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
        <td><strong>R <?php echo $sumproduct['SumProduct'] ?></strong></td>
        <td><strong>---</strong></td>
    </tr>
<?php 
    }?>
