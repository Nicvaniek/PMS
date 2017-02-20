///////////////////////////////////////////////////////////////////////
//                          Dashboard                                //
///////////////////////////////////////////////////////////////////////
$('#downloadZipForm').submit(function(e) {
    e.preventDefault();
    if ($('#dashboardPropertySelect').val() == "" ||
            $('#dashboardTypeSelect').val() == "") {

        swal({ title: "File Upload Unsuccessful", text: "Please select a property and the files you want to download.", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
        return;
    }
    window.open("../php/downloadZip.php?propertyID=" + $('#dashboardPropertySelect').val() + "&type="+$('#dashboardTypeSelect').val());
});

///////////////////////////////////////////////////////////////////////
//                          Renovations                              //
///////////////////////////////////////////////////////////////////////
$('#addRenovationForm').submit(function(e) {
    e.preventDefault();

    if (!($('#renovationPropertySelect').val() != "" &&
            ($('#nameRenovationInput').val() != "" ||
            $('#nameRenovationCustomInput').hasClass("valid")) &&
            $('#quantityRenovationInput').hasClass("valid") &&
            $('#costRenovationInput').hasClass("valid") &&
            $('#supplierRenovationInput').hasClass("valid"))) {

        swal({ title: "File Upload Unsuccessful", text: "Please fill out the required information.", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
        return;
    }

    if ($('#invoiceFileRenovationInput').val() == "") {
        swal({
            title: "Missing Invoice",
            text: "Are you sure you want to upload with out an invoice?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, upload it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {

            } else {
                swal("Cancelled", "Did not upload", "error");
                return;
            }
        });
    }

    var form = new FormData();

    if (document.getElementById("renovationSelectDiv").classList.contains("hide"))
        form.append('name', $('#nameRenovationCustomInput').val());
    else
        form.append('name', $('#nameRenovationInput').val());

    form.append('cost', $('#costRenovationInput').val());
    form.append('quantity', $('#quantityRenovationInput').val());
    form.append('supplier', $('#supplierRenovationInput').val());
    form.append('invoiceDate', $('#invoiceDateRenovationInput').val());

    var propertyDetails = $('#renovationPropertySelect').val();
    var res = propertyDetails.split(" ");

    var propertyID = res[0];
    form.append('propertyID', res[0]);

    var userID = res[1];
    form.append('userID', res[1]);

    var file_data = $('#invoiceFileRenovationInput').prop('files')[0];
    form.append('file', file_data);

    $.ajax({
        type: "POST",
        url: '../php/RenovationModule/addRenovation.php',
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        failure: function() {
            swal({ title: "Error!", text: "File upload unsuccessful", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
        },
        success: function(response) {
            console.log(response);
            if (response != "") {
                $("#dashboardTab").load("../WebApp/tabs/dashboardTab.php");
                $("#" + propertyID + "Renovationtbody").html("");
                swal({ title: "Renovation added!", type: "success", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
                $("#" + propertyID + "Renovationtbody").load("http://www.unhinged.co.za/Demo/php/RenovationModule/renovationTable.php?id=" + propertyID);

            } else {
                swal({ title: "Error!", text: "Details entered are unsupported", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////
//                          Expenses                                 //
///////////////////////////////////////////////////////////////////////
$('#addExpenseForm').submit(function(e) {
    e.preventDefault();

    if (!($('#expensePropertySelect').val() != "" &&
            $('#expenseOccurrenceSelect').val() != "" &&
            $('#nameExpenseInput').hasClass("valid") &&
            $('#quantityExpenseInput').hasClass("valid") &&
            $('#costExpenseInput').hasClass("valid") &&
            $('#paidToExpenseInput').hasClass("valid"))) {

        swal({ title: "File Upload Unsuccessful", text: "Please fill out the required information.", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
        return;
    }

    if ($('#invoiceFileExpenseInput').val() == "") {
        swal({
            title: "Missing Invoice",
            text: "Are you sure you want to upload with out an invoice?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, upload it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {

            } else {
                swal("Cancelled", "Did not upload", "error");
                return;
            }
        });
    }

    var form = new FormData();

    form.append('name', $('#nameExpenseInput').val());
    form.append('cost', $('#costExpenseInput').val());
    form.append('quantity', $('#quantityExpenseInput').val());
    form.append('occurrence', $('#expenseOccurrenceSelect').val());
    form.append('paidTo', $('#paidToExpenseInput').val());
    form.append('invoiceDate', $('#invoiceDateExpenseInput').val());

    var propertyDetails = $('#expensePropertySelect').val();
    var res = propertyDetails.split(" ");

    var propertyID = res[0];
    form.append('propertyID', res[0]);

    var userID = res[1];
    form.append('userID', res[1]);

    var file_data = $('#invoiceFileExpenseInput').prop('files')[0];
    form.append('file', file_data);

    $.ajax({
        type: "POST",
        url: '../php/ExpenseModule/addExpense.php',
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        failure: function() {
            swal({ title: "Error!", text: "File upload unsuccessful", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
        },
        success: function(response) {
            console.log(response);
            if (response != "") {
                $("#dashboardTab").load("../WebApp/tabs/dashboardTab.php");
                $("#" + propertyID + "Expensetbody").html("");
                swal({ title: "Expense added!", type: "success", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
                $("#" + propertyID + "Expensetbody").load("http://www.unhinged.co.za/Demo/php/ExpenseModule/ExpenseTable.php?id=" + propertyID);

            } else {
                swal({ title: "Error!", text: "Details entered are unsupported", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
            }
        }
    });
});
