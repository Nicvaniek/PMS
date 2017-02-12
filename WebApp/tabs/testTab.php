<?php 
    session_start();
    $userID = $_SESSION['ID'];
    $server = "localhost";
    $username = "morning2";
    $password = "cm7RQ73jf9";
    $database = "morning2_PropertyInvestor";
    // Create Connection
    $conn = mysqli_connect($server, $username, $password, $database);
?>
<div class='container'>
    <div class='row'>
        <div class='col m12'>
            <h4>Your Renovations</h4>
        </div>
    </div>
    <div class='row'>
        <div class="col m12">
        <?php
            $sql ="SELECT * FROM Properties WHERE UserID = " . $_SESSION['ID'] . "";
            $propertyResult = mysqli_query($conn, $sql);
            if ($propertyResult->num_rows > 0) 
            {
                while($propertyRow = $propertyResult->fetch_assoc()) 
                {
                    $count = 0;
                    $propertyLocation = $propertyRow["Location"];
                    $propertyLocation = str_replace(" ","", $propertyLocation);
        ?>
            <ul class="collapsible popout" data-collapsible="accordion">
                <li>
                    <div class='collapsible-header'>
                        <div class='row'>
                            <div class='col m8'>
                                <h5><?php echo $propertyRow["Location"]?></h5>
                            </div>                          
                        </div>
                    </div>
                    <div class='collapsible-body'>
                        <div>
                            <a style='padding-right: 40px; padding-left: 10px; padding-top: 5px;' href='#!' class='secondary-content'><i id='<?php echo $propertyLocation?>DeleteBtn' class='red-text text-darken-2 material-icons'>delete</i></a>
                            <a style='padding-right: 20px; padding-left: 10px; padding-top: 5px;' href='#!' class='secondary-content'><i id="<?php echo $propertyLocation?>DownloadBtn" class='black-text material-icons'>system_update_alt</i></a>
                            <a style='padding-right: 20px; padding-left: 10px; padding-top: 5px;' href='#editModal' class='secondary-content'><i id="<?php echo $propertyLocation?>EditBtn" class='black-text material-icons'>mode_edit</i></a>
                            
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
                            <tbody id="<?php echo $propertyLocation?>tbody">
                                <script>$("#<?php echo $propertyLocation?>tbody").load("../php/RenovationModule/renovationTable.php?id=<?php echo $propertyRow["ID"]?>&location=<?php echo $propertyLocation?>");</script>
                            </tbody>
                        </table>
                        <script type="text/javascript">

                            $('#<?php echo $propertyLocation?>DeleteBtn').on('click', function(e) {
                                var max = localStorage.getItem("<?php echo $propertyLocation?>max");
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
                                                                max--;
                                                                localStorage.setItem("<?php echo $propertyLocation?>max", max);
                                                                $("#dashboardTab").load("../WebApp/tabs/dashboardTab.php");
                                                            }                                        
                                                            else {
                                                                swal("Error", "Unable to delete renovation. Please refresh the page. ", "error");
                                                            }
                                                        });
                                                } else 
                                                {
                                                    swal("Cancelled", "Your renovation is safe", "error");
                                                }
                                                localStorage.setItem("<?php echo $propertyLocation?>max", max);
                                                $("#<?php echo $propertyLocation ?>tbody").load("../php/RenovationModule/renovationTable.php?id=<?php echo $renovationRow["ID"] ?>&location=<?php echo $propertyLocation?>");
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
                                var max = localStorage.getItem("<?php echo $propertyLocation?>max");
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
                                    swal("Error", "Please selected the renovation you wish to download", "error");
                                }                                        
                            });

                            $('#<?php echo $propertyLocation?>EditBtn').on('click', function(e) {
                                var max = localStorage.getItem("<?php echo $propertyLocation?>max");
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

                                        $('#editModal').modal('open');
                                    }
                                    count++;
                                }                                        
                            });
                        </script>
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
            <div class='col m8'>
                <h4>Add Renovation</h4>
            </div>
            <div class='col m4'>
                <br>
                <p>
                    <input type='checkbox' id='customRenovation' onclick='customRenovation()' />
                    <label for='customRenovation'>Custom Renovation</label>
                </p>
            </div>
        </div>
        <form id="addRenovationForm" enctype='multipart/form-data'>
            <div class='row'>
                <div class='input-field col m12'>
                    <select id="renovationPropertySelect" name="renovationPropertySelect" data-error=".errorTxt10">
                        <option value='' disabled selected>Choose your property</option>
                        <?php 
                        $sql ="SELECT * FROM Properties WHERE UserID = " . $_SESSION['ID'] . "";
                        $propertyResult = mysqli_query($conn, $sql);
                        if ($propertyResult->num_rows > 0) 
                        {
                            while($propertyRow = $propertyResult->fetch_assoc()) 
                            {
                                $propertyLocation = $propertyRow["Location"];
                                $propertyLocation = str_replace(" ","", $propertyLocation);
                                ?>
                        <option value='<?php echo $propertyLocation. " " .$propertyRow['ID']. " " .$userID?>'>
                            <?php echo $propertyRow['Location']?>
                        </option>
                        <?php
                            }
                        }
                    ?>
                    </select>
                    <label>Property</label>
                    <div class="errorTxt11"></div>
                </div>
            </div>
            <div class="row">
                <div id='renovationSelectDiv' class='input-field col m6'>
                    <select id='nameRenovationInput' name="nameRenovationInput" data-error=".errorTxt10">
                        <optgroup label=' WALL AND FLOOR COVERINGS '>
                            <option value='' disabled selected>Choose your renovation</option>
                            <option value='FloorCovering'> Floor Covering </option>
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
                            <option value='External'> External </option>
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
                    <div class="errorTxt10"></div>
                </div>
                <div id="customRenovationDiv" class="input-field col m6 hide">
                    <i class="material-icons prefix">info_outline</i>
                    <input id="nameRenovationCustomInput" name="nameRenovationCustomInput" type="text" data-error=".errorTxt1">
                    <div class="errorTxt1"></div>
                    <label for="nameRenovationCustomInput">Custom Renovation</label>
                </div>
                <div class="input-field col m3">
                    <i class="material-icons prefix">mode_edit</i>
                    <input id="quantityRenovationInput" name="quantityRenovationInput" type="number" data-error=".errorTxt2">
                    <div class="errorTxt2"></div>
                    <label for="quatnityRenovationInput">Quantity</label>
                </div>
                <div class="input-field col m3">
                    <i class="material-icons prefix">shopping_cart</i>
                    <input id="costRenovationInput" name="costRenovationInput" type="number" data-error=".errorTxt3">
                    <div class="errorTxt3"></div>
                    <label for="costRenovationInput">Amount</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col m6">
                    <i class="material-icons prefix">store</i>
                    <input id="supplierRenovationInput" name="supplierRenovationInput" type="text" data-error=".errorTxt4">
                    <div class="errorTxt4"></div>
                    <label for="supplierRenovationInput">Supplier</label>
                </div>
                <div class="input-field col m6">
                    <i class="material-icons prefix">today</i>
                    <input id="invoiceDateRenovationInput" name="invoiceDateRenovationInput" type="date" class="datepicker" data-error=".errorTxt5">
                    <div class="errorTxt5"></div>
                    <label for="invoiceDatePicker">Invoice Date</label>
                </div>
            </div>
            <div class='row'>
                <div class='file-field input-field s4'>
                    <div class='btn red darken-2'>
                        <span>Invoice</span>
                        <input id='invoiceFileRenovationInput' accept="application/pdf" type='file'>
                    </div>
                    <div class='file-path-wrapper'>
                        <input class='file-path validate' type='text'>
                    </div>
                </div>
            </div>
            <div class='row'>
                <button class='btn red darken-2 waves-effect waves-light' type='submit'>Add Renovation
                    <i class='material-icons right'>send</i>
                </button>
                <br>
                <br>
            </div>
        </form>

</div>
