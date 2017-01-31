<div class='container'>
    <div class='row'>
        <div class='col m12'>
            <h3>Your Renovations</h3>
        </div>
    </div>
    <div class='row'>
        <div class="col m12">
        <?php
            $server = "localhost";
            $username = "morning2";
            $password = "cm7RQ73jf9";
            $database = "morning2_PropertyInvestor";
            // Create Connection
            $conn = mysqli_connect($server, $username, $password, $database);
            $sql ="SELECT * FROM Properties WHERE UserID = 1";
            $propertyResult = mysqli_query($conn, $sql);
            if ($propertyResult->num_rows > 0) 
            {
                while($propertyRow = $propertyResult->fetch_assoc()) 
                {
                    $count = 0;
                    $propertyName = $propertyRow["Location"];
                    $propertyName = str_replace(" ","", $propertyName);
        ?>
            <ul class="collapsible popout" data-collapsible="accordion">
                <li>
                    <div class='collapsible-header'>
                        <div class='row'>
                            <div class='col m12'>
                                <h5><?php echo $propertyRow["Location"]?></h5>
                            </div>
                        </div>
                    </div>
                    <div class='collapsible-body'>
                        <div>
                            <a style='padding-right: 5px; padding-left: 5px; padding-top: 5px;' href='#!' class='secondary-content'><i id='<?php echo $propertyName?>DeleteBtn' class='red-text text-darken-2 material-icons'>delete</i></a>
                            <a style='padding-right: 5px; padding-left: 5px; padding-top: 5px;' href='#!' class='secondary-content'><i id="<?php echo $propertyName?>DownloadBtn" class='black-text material-icons'>system_update_alt</i></a>
                            <a style='padding-right: 5px; padding-left: 5px; padding-top: 5px;' href='#editModal' class='secondary-content'><i id="<?php echo $propertyName?>EditBtn" class='black-text material-icons'>mode_edit</i></a>
                            
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th data-field='id'>Description</th>
                                    <th data-field='name'>Supplier </th>
                                    <th data-field='price'>Invoice attached</th>
                                    <th data-field='name'>Invoice date</th>
                                    <th data-field='price'>Amount Paid</th>
                                    <th data-field='price'>Select</th>
                                </tr>
                            </thead>
                            <tbody id="<?php echo $propertyName?>tbody">
                            <?php
                                $sql ="SELECT * FROM Renovations WHERE PropertyID = 1 ORDER BY ID";
                                $renovationResult = mysqli_query($conn, $sql);

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
                                <script type="text/javascript">
                                    $('#<?php echo $propertyName?>DeleteBtn').on('click', function(e) {
                                        alert("Bitttch");

                                        var max = <?php echo $count; ?> ;
                                        alert("Bitttch1");
                                        var count = 0;
                                        while(count < max)
                                        {
                                            if($('#<?php echo $propertyName?>Radio' + count + '').is(':checked'))
                                            {
                                                var id1 = $('#<?php echo $propertyName?>Radio' + count + ':checked').val();
                                                var trID = "<?php echo $propertyName?>Tr" + count + "";

                                                $.post('../php/RenovationModule/deleteRenovation.php', {
                                                id: id1
                                                }, function(d) {
                                                    if (d != "")
                                                    {
                                                        alert(d);
                                                        
                                                        alert(trID);
                                                        document.getElementById(trID).innerHTML = "";
                                                    }                                        
                                                    else {
                                                        //error
                                                    }
                                                });
                                            }
                                            count++;
                                        }                                        
                                    });
                                    $('#<?php echo $propertyName?>DownloadBtn').on('click', function(e) {
                                        alert("nigga");

                                        var max = <?php echo $count; ?> ;
                                        alert("nigga1");
                                        var count = 0;
                                        while(count < max)
                                        {
                                            if($('#<?php echo $propertyName?>Radio' + count + '').is(':checked'))
                                            {
                                                var id1 = $('#<?php echo $propertyName?>Radio' + count + ':checked').val();
                                                window.open("../php/RenovationModule/downloadRenovation.php?id="+id1);
                                            }
                                            count++;
                                        }                                        
                                    });
                                    $('#<?php echo $propertyName?>EditBtn').on('click', function(e) {

                                        var max = <?php echo $count; ?> ;
                                        var count = 0;
                                        while(count < max)
                                        {
                                            if($('#<?php echo $propertyName?>Radio' + count + '').is(':checked'))
                                            {
                                                var id1 = $('#<?php echo $propertyName?>Radio' + count + ':checked').val();
                                                $("#editModal").load("../php/RenovationModule/editRenovation.php?id="+id1);
                                                alert("wigga2");
                                                $('#editModal').modal('open');
                                                alert("wigga9000");
                                            }
                                            count++;
                                        }                                        
                                    });
                                </script>
                            </tbody>
                        </table>
                    </div>
                </li>
            <?php 
                    }
                }
            ?>                   
            </ul>
        </div>
    </div>
    <div class='row'>
        <div class='col m10'>
            <h3>Add Renovation</h3>
        </div>
        <div class='col m2'>
            <br>
            <p>
                <input type='checkbox' id='customRenovation' onclick='customRenovation()' />
                <label for='customRenovation'>Custom Renovation</label>
            </p>
        </div>
    </div>
    <form id='addRenovationForm' action='#' method='post' enctype='multipart/form-data'>
        <div class='row'>
            <div class='input-field col m8'>
                <select id="renovationPropertySelect">
                    <option value='' disabled selected>Choose your property</option>
                    <?php 
                        $sql ="SELECT * FROM Properties WHERE UserID = 1";
                        $propertyResult = mysqli_query($conn, $sql);
                        if ($propertyResult->num_rows > 0) 
                        {
                            while($propertyRow = $propertyResult->fetch_assoc()) 
                            {
                                $propertyName = $propertyRow["Location"];
                                $propertyName = str_replace(" ","", $propertyName);
                                ?>

                                <option value='<?php echo $propertyName?>'><?php echo $propertyRow['Location']?></option>
                                <?php
                            }
                        }
                    ?>
                </select>
                <label>Property</label>
            </div>
        </div>
        <div class='row'>
            <div id='renovationSelectDiv' class='input-field col m8'>
                <select id='nameRenovationInput' class='validate' required>
                    <optgroup label=' WALL AND FLOOR COVERINGS '>
                        <option value='' disabled selected>Choose your renovation</option>
                        <option value='siekReno'>Floor Covering </option>
                        <option value='siekReno'>Vinyl </option>
                        <option value='siekReno'>Laminated </option>
                        <option value='siekReno'>Wood </option>
                        <option value='siekReno'>Cemcrete </option>
                        <option value='siekReno'>Screed </option>
                        <option value='siekReno'>Skirting </option>
                        <option value='siekReno'>Architraves </option>
                        <option value='siekReno'>Carpets </option>
                        <option value='siekReno'>Wall Tiling </option>
                    </optgroup>
                    <optgroup label=' GENERAL BUILDING WORKS '>
                        <option value='siekReno'>Ceilings </option>
                        <option value='siekReno'>Cornices </option>
                        <option value='siekReno'>Roofstructure </option>
                        <option value='siekReno'>Roof Covering </option>
                        <option value='siekReno'>Doors </option>
                        <option value='siekReno'>Locks </option>
                        <option value='siekReno'>Handels </option>
                        <option value='siekReno'>Window Quote </option>
                    </optgroup>
                    <optgroup label=' CLADDING '>
                        <option value='siekReno'>Stone</option>
                        <option value='siekReno'>Aliminium</option>
                        <option value='siekReno'>Timber</option>
                    </optgroup>
                </select>
                <label>Renovation</label>
            </div>
            <div id='customRenovationDiv' class='input-field col m8 hide'>
                <input id='nameRenovationCustomInput' type='text' class='validate' required>
                <label for='customRenovationRenovationInput'>Custom Renovation</label>
            </div>
            <div class='input-field col m2'>
                <input id='quantityRenovationInput' type='number' class='validate' required>
                <label for='quatnityRenovationInput'>Quantity</label>
            </div>
            <div class='input-field col m2'>
                <input id='costRenovationInput' type='number' class='validate' required>
                <label for='costRenovationInput'>Cost</label>
            </div>
        </div>
        <div class='row'>
            <div class='input-field col m6'>
                <input id='supplierRenovationInput' type='text' class='validate' required>
                <label for='supplierRenovationInput'>Supplier</label>
            </div>
            <div class='input-field col m6'>
                <input id='invoiceDateRenovationInput' type='date' class='datepicker' required>
                <label for='invoiceDatePicker'>Invoice Date</label>
            </div>
        </div>
    </form>
    <form id='addRenovationFileForm' action='#' method='post' enctype='multipart/form-data'>
        <div class='row'>
            <div class='file-field input-field s4'>
                <div class='btn red darken-2'>
                    <span>Invoice</span>
                    <input id='invoiceFileRenovationInput' type='file'>
                </div>
                <div class='file-path-wrapper'>
                    <input class='file-path validate' type='text'>
                </div>
            </div>
        </div>
        <div class='row'>
            <button id='addRenovationBtn' class='btn red darken-2 waves-effect waves-light' type='submit' name='action'>Add Renovation
                <i class='material-icons right'>send</i>
            </button>
        </div>
    </form>
</div>
