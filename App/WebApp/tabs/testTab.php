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
        <div class='col m12 s12'>
            <h4>Your Expenses</h4>
        </div>
    </div>
    <div class='row'>
        <div class="col m12 s12">
        <?php
            $sql ="SELECT * FROM Properties WHERE UserID = " . $_SESSION['ID'] . "";
            $propertyResult = mysqli_query($conn, $sql);
            if ($propertyResult->num_rows > 0) 
            {
                while($propertyRow = $propertyResult->fetch_assoc()) 
                {
                    $count = 0;
                    $propertyID = $propertyRow["ID"];
        ?>
            <ul class="collapsible popout" data-collapsible="accordion">
                <li>
                    <div class='collapsible-header'>
                        <div class='row'>
                            <div class='col m8 s12'>
                                <h5><?php echo $propertyRow["Name"]?></h5>
                            </div>                          
                        </div>
                    </div>
                    <div class='collapsible-body'>
                        <div class='row'>
                            <div class="col m12 hide-on-small-only">
                                <a style='padding-right: 40px; padding-left: 10px; padding-top: 15px;' href='#!' class='secondary-content'><i id='<?php echo $propertyID?>DeleteExpenseBtn' class='red-text text-darken-2 material-icons'>delete</i></a>
                                <a style='padding-right: 20px; padding-left: 10px; padding-top: 15px;' href='#!' class='secondary-content'><i id="<?php echo $propertyID?>DownloadExpenseBtn" class='black-text material-icons'>system_update_alt</i></a>
                                <a style='padding-right: 20px; padding-left: 10px; padding-top: 15px;' href='#editModal' class='secondary-content'><i id="<?php echo $propertyID?>EditExpenseBtn" class='black-text material-icons'>mode_edit</i></a>
                            </div> 
                        </div>
                        <table class="responsive-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>PaidTo </th>
                                    <th>Invoice attached</th>
                                    <th>Invoice date</th>
                                    <th>Amount Paid</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Occurrence</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tfoot class="hide-on-med-and-up">
                                <div class='row hide-on-med-and-up'>
                                    <div class='col m12'>
                                        <a style='padding-right: 5px; padding-left: 10px; padding-top: 5px;' href='#!' class='secondary-content'><i id='<?php echo $propertyID?>DeleteExpenseBtn' class='red-text text-darken-2 material-icons'>delete</i></a>
                                        <a style='padding-right: 20px; padding-left: 10px; padding-top: 5px;' href='#!' class='secondary-content'><i id="<?php echo $propertyID?>DownloadExpenseBtn" class='black-text material-icons'>system_update_alt</i></a>
                                        <a style='padding-right: 20px; padding-left: 80px; padding-top: 5px;' href='#editModal' class='secondary-content'><i id="<?php echo $propertyID?>EditExpenseBtn" class='black-text material-icons'>mode_edit</i></a>
                                    </div>
                                    
                                </div>
                            </tfoot>
                            <tbody id="<?php echo $propertyID?>Expensetbody">
                                <script>$("#<?php echo $propertyID?>Expensetbody").load("../php/ExpenseModule/expenseTable.php?id=<?php echo $propertyRow["ID"]?>");</script>
                            </tbody>
                        </table>
                        <script type="text/javascript">

                            $('#<?php echo $propertyID?>DeleteExpenseBtn').on('click', function(e) {
                                var max = localStorage.getItem("<?php echo $propertyID?>Expensemax");
                                if(max == 0)
                                {
                                    swal("Error", "You have no expenses for this property. ", "error");
                                    return;
                                }
                                var count = 0;
                                var found = false;
                                while(count < max)
                                {
                                    if($('#<?php echo $propertyID?>ExpenseRadio' + count + '').is(':checked'))
                                    {
                                        found = true;
                                        var id1 = $('#<?php echo $propertyID?>ExpenseRadio' + count + ':checked').val();
                                        var trID = "<?php echo $propertyID?>ExpenseTr" + count + "";
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
                                                    $.post('../php/ExpenseModule/deleteExpense.php', {
                                                        id: id1
                                                        }, function(d) {
                                                            if (d != "")
                                                            {
                                                                swal("Deleted!", "Your expense has been deleted.", "success");
                                                                document.getElementById(trID).innerHTML = "";
                                                                max--;
                                                                localStorage.setItem("<?php echo $propertyID?>Expensemax", max);
                                                                $("#dashboardTab").load("../WebApp/tabs/dashboardTab.php");
                                                                $("#<?php echo $propertyID ?>ExpenseSumProduct").load("http://www.unhinged.co.za/Demo/php/ExpenseModule/expenseSumProduct.php?id=<?php echo $propertyRow["ID"] ?>");
                                                            }                                        
                                                            else {
                                                                swal("Error", "Unable to delete expense. Please refresh the page. ", "error");
                                                            }
                                                        });
                                                } else 
                                                {
                                                    swal("Cancelled", "Your expense is safe", "error");
                                                }
                                        });
                                    }
                                    count++;
                                }
                                if(found == false)
                                {
                                    swal("Error", "Please selected the expense you wish to delete", "error");
                                }                                        
                            });

                            $('#<?php echo $propertyID?>DownloadExpenseBtn').on('click', function(e) {
                                var max = localStorage.getItem("<?php echo $propertyID?>Expensemax");
                                if(max == 0)
                                {
                                    swal("Error", "You have no expenses for this property. ", "error");
                                    return;
                                }
                                var count = 0;
                                var found = false;
                                while(count < max)
                                {
                                    if($('#<?php echo $propertyID?>ExpenseRadio' + count + '').is(':checked'))
                                    {
                                        found = true;
                                        var id1 = $('#<?php echo $propertyID?>ExpenseRadio' + count + ':checked').val();
                                        window.open("../php/ExpenseModule/downloadExpense.php?id="+id1);
                                    }
                                    count++;
                                } 
                                if(found == false)
                                {
                                    swal("Error", "Please selected the expense you wish to download", "error");
                                }                                        
                            });

                            $('#<?php echo $propertyID?>EditExpenseBtn').on('click', function(e) {
                                var max = localStorage.getItem("<?php echo $propertyID?>Expensemax");
                                if(max == 0)
                                {
                                    swal("Error", "You have no expenses for this property. ", "error");
                                    return;
                                }
                                var count = 0;
                                while(count < max)
                                {
                                    if($('#<?php echo $propertyID?>ExpenseRadio' + count + '').is(':checked'))
                                    {
                                        var id1 = $('#<?php echo $propertyID?>ExpenseRadio' + count + ':checked').val();
                                        //$("#editModal").load("../php/ExpenseModule/editExpense.php?id="+id1);

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
            <div class='col m8 s12'>
                <h4>Add Expense</h4>
            </div>
        </div>
        <form id="addExpenseForm" enctype='multipart/form-data'>
            <div class='row'>
                <div class='input-field col m10 s12'>
                    <select id="expensePropertySelect" name="expensePropertySelect" data-error=".errorTxt11">
                        <option value='' disabled selected>Choose your property</option>
                        <?php 
                        $sql ="SELECT * FROM Properties WHERE UserID = " . $_SESSION['ID'] . "";
                        $propertyResult = mysqli_query($conn, $sql);
                        if ($propertyResult->num_rows > 0) 
                        {
                            while($propertyRow = $propertyResult->fetch_assoc()) 
                            {
                                ?>
                        <option value='<?php echo $propertyRow['ID']. " " .$userID?>'>
                            <?php echo $propertyRow['Name']?>
                        </option>
                        <?php
                            }
                        }
                    ?>
                    </select>
                    <label>Property</label>
                    <div class="errorTxt11"></div>
                </div>
                <div class="input-field col m2 s12">
                    <select id="expenseOccurrenceSelect" name="expenseOccurrenceSelect" data-error=".errorTxt17">
                        <option value='' disabled selected>Choose the occurrence</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                    </select>
                    <label>Occurrence</label>
                    <div class="errorTxt17"></div>
                </div>
            </div>

            <div class="row">
                <div class="input-field col m6 s12">
                    <i class="material-icons prefix">info_outline</i>
                    <input id="nameExpenseInput" name="nameExpenseInput" type="text" data-error=".errorTxt12">
                    <div class="errorTxt12"></div>
                    <label for="nameExpenseInput">Expense Discription</label>
                </div>
                <div class="input-field col m3 s12">
                    <i class="material-icons prefix">mode_edit</i>
                    <input id="quantityExpenseInput" name="quantityExpenseInput" type="number" data-error=".errorTxt13">
                    <div class="errorTxt13"></div>
                    <label for="quatnityExpenseInput">Quantity</label>
                </div>
                <div class="input-field col m3 s12">
                    <i class="material-icons prefix">shopping_cart</i>
                    <input id="costExpenseInput" name="costExpenseInput" type="number" data-error=".errorTxt14">
                    <div class="errorTxt14"></div>
                    <label for="costExpenseInput">Amount</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col m6 s12">
                    <i class="material-icons prefix">store</i>
                    <input id="paidToExpenseInput" name="paidToExpenseInput" type="text" data-error=".errorTxt15">
                    <div class="errorTxt15"></div>
                    <label for="paidToExpenseInput">Paid To</label>
                </div>
                <div class="input-field col m6 s12">
                    <i class="material-icons prefix">today</i>
                    <input id="invoiceDateExpenseInput" name="invoiceDateExpenseInput" type="date" class="datepicker" data-error=".errorTxt16">
                    <div class="errorTxt16"></div>
                    <label for="invoiceDatePicker">Invoice Date</label>
                </div>
            </div>
            <div class='row'>
                <div class='file-field input-field m4 s12'>
                    <div class='btn red darken-2'>
                        <span>Invoice</span>
                        <input id='invoiceFileExpenseInput' accept="application/pdf" type='file'>
                    </div>
                    <div class='file-path-wrapper'>
                        <input class='file-path validate' type='text'>
                    </div>
                </div>
            </div>
            <div class='row'>
                <button class='btn red darken-2 waves-effect waves-light' type='submit'>Add Expense
                    <i class='material-icons right'>send</i>
                </button>
                <br>
                <br>
            </div>
        </form>

</div>
