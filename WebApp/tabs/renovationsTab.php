<style>
    #addRenovationForm {
        width: 670px;
    }
    #addRenovationForm label.error {
        margin-left: 10px;
        width: auto;
        display: inline;
    }
</style>
<script type="text/javascript">
    $().ready(function() {
    $("#signupForm").validate({
            rules: {
                nameRenovationCustomInput: {
                    required: true,
                    minlength: 2
                }
            },
            messages: {
                nameRenovationCustomInput: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                }
            }
        });
    });
</script>
<div class='container'>
    <div class="row">
    <br>
    <br>
    <?php
        $server = "localhost";
        $username = "morning2";
        $password = "cm7RQ73jf9";
        $database = "morning2_PropertyInvestor";
        // Create Connection
        $conn = mysqli_connect($server, $username, $password, $database);
        $sql ="SELECT * FROM Properties WHERE UserID = 1";
        $result = mysqli_query($conn, $sql);  
        if ($result->num_rows > 0) 
        {
    ?>
        <div class="row">
        <?php
            $count = 0;
            while($row = $result->fetch_assoc()) 
            {?>
            <div class='col m4'>
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title"><?php echo $row["Location"] ?></span>
                        <?php 
                            $sql ="SELECT SUM(Cost) FROM Renovations WHERE UserID = 1 AND PropertyID = 1";
                            $costResult = mysqli_query($conn, $sql);
                            $costTotal = $costResult->fetch_assoc();

                            $sql ="SELECT COUNT(Cost) FROM Renovations WHERE UserID = 1 AND PropertyID = 1";
                            $NoOfResult = mysqli_query($conn, $sql);
                            $NoOf = $NoOfResult->fetch_assoc();
                        ?>
                        <p>Total Cost: R<?php echo $costTotal["SUM(Cost)"]?> From <?php echo $NoOf["COUNT(Cost)"]?> Renovations</p>
                    </div>
                    <div class="card-action">
                      <a href="#">Download Report</a>
                    </div>
                </div>
            </div>
            <?php
                $count++;
                if($count == 3)
                {
                    $count = 0;
                ?>
                </div>
                <div class="row">
                <?php
                }
            }
        ?> 
        </div>
    <?php
        }
    ?>    
    </div>
    <div class='row'>
        <div class='col m12'>
            <h4>Your Renovations</h4>
        </div>
    </div>
    <div class='row'>
        <div class="col m12">
        <?php
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
                            <div class='col m8'>
                                <h5><?php echo $propertyRow["Location"]?></h5>
                            </div>
                            <div class="col m4">
                                <?php 
                                    $sql ="SELECT SUM(Cost) FROM Renovations WHERE UserID = 1 AND PropertyID = 1";
                                    $costResult = mysqli_query($conn, $sql);
                                    $costTotal = $costResult->fetch_assoc();

                                    $sql ="SELECT COUNT(Cost) FROM Renovations WHERE UserID = 1 AND PropertyID = 1";
                                    $NoOfResult = mysqli_query($conn, $sql);
                                    $NoOf = $NoOfResult->fetch_assoc();
                                ?>
                                <p class="grey-text text-darken-2">Total Cost: R<?php echo $costTotal["SUM(Cost)"]?> From <?php echo $NoOf["COUNT(Cost)"]?> Renovations</p>
                            </div>                            
                        </div>
                    </div>
                    <div class='collapsible-body'>
                        <div>
                            <a style='padding-right: 40px; padding-left: 10px; padding-top: 5px;' href='#!' class='secondary-content'><i id='<?php echo $propertyName?>DeleteBtn' class='red-text text-darken-2 material-icons'>delete</i></a>
                            <a style='padding-right: 20px; padding-left: 10px; padding-top: 5px;' href='#!' class='secondary-content'><i id="<?php echo $propertyName?>DownloadBtn" class='black-text material-icons'>system_update_alt</i></a>
                            <a style='padding-right: 20px; padding-left: 10px; padding-top: 5px;' href='#editModal' class='secondary-content'><i id="<?php echo $propertyName?>EditBtn" class='black-text material-icons'>mode_edit</i></a>
                            
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Supplier </th>
                                    <th>Invoice attached</th>
                                    <th>Invoice date</th>
                                    <th>Amount Paid</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Select</th>
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
                                    <td> R <?php echo $renovationRow["Cost"]?> </td>
                                    <td> <?php echo $renovationRow["Quantity"]?> </td>
                                    <td> R <?php echo ($renovationRow["Cost"] * $renovationRow["Quantity"]) ?> </td>
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
                                        var max = <?php echo $count; ?> ;
                                        var count = 0;
                                        var found = false;
                                        while(count < max)
                                        {
                                            if($('#<?php echo $propertyName?>Radio' + count + '').is(':checked'))
                                            {
                                                found = true;
                                                var id1 = $('#<?php echo $propertyName?>Radio' + count + ':checked').val();
                                                var trID = "<?php echo $propertyName?>Tr" + count + "";
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
                                    $('#<?php echo $propertyName?>DownloadBtn').on('click', function(e) {
                                        var max = <?php echo $count; ?> ;
                                        var count = 0;
                                        var found = false;
                                        while(count < max)
                                        {
                                            if($('#<?php echo $propertyName?>Radio' + count + '').is(':checked'))
                                            {
                                                found = true;
                                                var id1 = $('#<?php echo $propertyName?>Radio' + count + ':checked').val();
                                                window.open("../php/RenovationModule/downloadRenovation.php?id="+id1);
                                            }
                                            count++;
                                        } 
                                        if(found == false)
                                        {
                                            swal("Error", "Please selected the renovation you wish to delete", "error");
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
            <h4>Add Renovation</h4>
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
            <div id='renovationSelectDiv' class='input-field col m6'>
                <select id='nameRenovationInput' class='validate' required>
                    <optgroup label=' WALL AND FLOOR COVERINGS '>
                        <option value='' disabled selected>Choose your renovation</option>
                        <option value='FloorCovering'> Floor Covering  </option>
                        <option value='Vinyl'> Vinyl </option>
                        <option value='Laminated'> Laminated </option>
                        <option value='Wood'> Wood </option>
                        <option value='Cemcrete'> Cemcrete </option>
                        <option value='Screed'> Screed </option>
                        <option value='Skirting'> Skirting </option>
                        <option value='Architraves'> Architraves </option>
                        <option value='Carpets'> Carpets </option>
                        <option value='Wall Tiling'> Wall Tiling </option>
                    </optgroup>
                    <optgroup label=' GENERAL BUILDING WORKS '>
                        <option value='Ceilings'> Ceilings </option>
                        <option value='Cornices'> Cornices </option>
                        <option value='Roofstructure'> Roofstructure </option>
                        <option value='Roof Covering'> Roof Covering </option>
                        <option value='Doors'> Doors </option>
                        <option value='Locks'> Locks </option>
                        <option value='Handels'> Handels </option>
                        <option value='Window Quote'> Window Quote </option>
                    </optgroup>
                    <optgroup label=' CLADDING '>
                        <option value='Stone'> Stone </option>
                        <option value='Aliminium'> Aliminium </option>
                        <option value='Timber'> Timber </option>
                    </optgroup>
                    <optgroup label=' PLUMBING '>
                    </optgroup>
                    <optgroup label=' SANITARYWARE '>
                    </optgroup>
                    <optgroup label=' KITCHEN AND BICS '>
                    </optgroup>
                    <optgroup label=' LIGHT FITTINGS '>
                    </optgroup>
                    <optgroup label=' ELECTRICAL '>
                    </optgroup>
                    <optgroup label=' EXTERNAL WORK '>
                        <option value='Kitchen and Bics'> Kitchen and Bics </option>
                        <option value='Light fittings'> Light fittings </option>
                        <option value='Electrical'> Electrical </option>
                        <option value='External Work'> External Work </option>
                        <option value='Pool'> Pool </option>
                        <option value='Braai'> Braai </option>
                        <option value='Fireplace'> Fireplace </option>
                        <option value='External Shower'> External Shower </option>
                        <option value='Rainwater harvesting'> Rainwater harvesting </option>
                        <option value='Water storage tanks'> Water storage tanks </option>
                        <option value='Water storage pumps'> Water storage pumps </option>
                        <option value='Timber decking'> Timber decking </option>
                        <option value='Timber screening'> Timber screening </option>
                        <option value='Pergolas'> Pergolas </option>
                        <option value='Boma'> Boma </option>
                        <option value='Garage Doors'> Garage Doors </option>
                        <option value='Solar power system'> Solar power system </option>
                        <option value='Battery room and invertors'> Battery room and invertors </option>
                        <option value='Security System'> Security System </option>
                        <option value='Gutters'> Gutters </option>
                        <option value='Screen walls'> Screen walls </option>
                        <option value='Yard gates'> Yard gates </option>
                        <option value='Washing lines'> Washing lines </option>
                        <option value='Landscaping'> Landscaping </option>
                        <option value='Irrigation'> Irrigation </option>
                        <option value='Paving'> Paving </option>
                        <option value='Painting'> Painting </option>
                        <option value='Internal'> Internal </option>
                        <option value='External'> External  </option>
                        <option value=''> Miscellaneous </option>
                        <option value='Bar area'> Bar area </option>
                        <option value='Wine Cella'> Wine Cellar </option>
                        <option value='Special staircase'> Special staircase </option>
                        <option value='Balustrades (Glass - Int. and Ext.)'> Balustrades (Glass - Int. and Ext.) </option>
                        <option value='Mild steel'> Mild steel </option>
                        <option value='Aliminium'> Aliminium </option>
                        <option value='Glass'> Glass </option>
                    </optgroup>
                </select>
                <label>Renovation</label>
            </div>
            <div id='customRenovationDiv' class='input-field col m6 hide'>
                <i class="material-icons prefix">info_outline</i>
                <input id='nameRenovationCustomInput' type='text'>
                <label for='customRenovationInput'>Custom Renovation</label>
            </div>
            <div class='input-field col m3'>
                <i class="material-icons prefix">mode_edit</i>
                <input id='quantityRenovationInput' type='number' class='validate' required>
                <label for='quatnityRenovationInput'>Quantity</label>

            </div>
            <div class='input-field col m3'>
                <i class="material-icons prefix">shopping_cart</i>
                <input id='costRenovationInput' type='number' class='validate' required>
                <label for='costRenovationInput'>Amount</label>

            </div>
        </div>
        <div class='row'>
            <div class='input-field col m6'>
                <i class="material-icons prefix">store</i>
                <input id='supplierRenovationInput' type='text' class='validate' required>
                <label for='supplierRenovationInput'>Supplier</label>
            </div>
            <div class='input-field col m6'>
                <i class="material-icons prefix">today</i>
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
            <br>
            <br>
        </div>
    </form>
</div>
