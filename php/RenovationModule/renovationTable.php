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
    <script type="text/javascript">
        $('#<?php echo $propertyLocation?>DeleteBtn').on('click', function(e) {
            var max = <?php echo $count; ?> ;
            if(max == 0)
            {
                swal("Error", "You have no renovations for this property. ", "error");
                return;
            }
            var count = 0;
            var found = false;
            while(count < max)
            {
                if($('#<?php echo $propertyLocation?>Radio' + count + '').is(':checked'))
                {
                    found = true;
                    var id1 = $('#<?php echo $propertyLocation?>Radio' + count + ':checked').val();
                    var trID = "<?php echo $propertyLocation?>Tr" + count + "";
                    swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this entry",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },function(isConfirm)
                        {
                            if (isConfirm) 
                            {
                                $.post('../php/RenovationModule/deleteRenovation.php', {
                                    id: id1
                                    }, function(d) {
                                        if (d != "")
                                        {
                                            swal("Deleted!", "Your renovation has been.", "success");
                                            document.getElementById(trID).innerHTML = "";
                                        }                                        
                                        else {
                                            swal("Error", "Unable to delete renovation. Please refresh the page. ", "error");
                                        }
                                    });
                            } else 
                            {
                                swal("Cancelled", "Your renovation is safe", "error");
                            }
                    });
                }
                count++;
            }
            if(found == false)
            {
                swal("Error", "Please selected the renovation you wish to delete", "error");
            }                                        
        });

        $('#<?php echo $propertyLocation?>DownloadBtn').on('click', function(e) {
            var max = <?php echo $count; ?> ;
            if(max == 0)
            {
                swal("Error", "You have no renovations for this property. ", "error");
                return;
            }
            var count = 0;
            var found = false;
            while(count < max)
            {
                if($('#<?php echo $propertyLocation?>Radio' + count + '').is(':checked'))
                {
                    found = true;
                    var id1 = $('#<?php echo $propertyLocation?>Radio' + count + ':checked').val();
                    window.open("../php/RenovationModule/downloadRenovation.php?id="+id1);
                }
                count++;
            } 
            if(found == false)
            {
                swal("Error", "Please selected the renovation you wish to delete", "error");
            }                                        
        });
        $('#<?php echo $propertyLocation?>EditBtn').on('click', function(e) {

            var max = <?php echo $count; ?> ;
            if(max == 0)
            {
                swal("Error", "You have no renovations for this property. ", "error");
                return;
            }
            var count = 0;
            while(count < max)
            {
                if($('#<?php echo $propertyLocation?>Radio' + count + '').is(':checked'))
                {
                    var id1 = $('#<?php echo $propertyLocation?>Radio' + count + ':checked').val();
                    $("#editModal").load("../php/RenovationModule/editRenovation.php?id="+id1);
                    alert("wigga2");
                    $('#editModal').modal('open');
                    alert("wigga9000");
                }
                count++;
            }                                        
        });
    </script>
<?php 
    }?>
