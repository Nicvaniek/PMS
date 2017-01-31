<?php
    require_once '../include/DB_Connect.php';
    $sql ="SELECT * FROM Renovations WHERE PropertyID = 1 ORDER BY ID";
    $renovationResult = mysqli_query($conn, $sql);
    $count = 0;
    $propertyName = $_GET['id'];

    if ($renovationResult->num_rows > 0) 
    {
        while($renovationRow = $renovationResult->fetch_assoc()) 
        {
?>
    <tr id='<?php echo $propertyName?>Tr<?php echo $count?>'>
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
        <td>
            <div>
                <input class='with-gap' name='group2' type='radio' id='<?php echo $propertyName?>Radio<?php echo $count?>' value='<?php echo $renovationRow["ID"] ?>'/>
                <label for='<?php echo $propertyName?>Radio<?php echo $count++?>'></label>
            </div>
        </td>
    </tr>
<?php 
        }
    }
?>