///////////////////////////////////////////////////////////////////////
//                          Renovations                              //
///////////////////////////////////////////////////////////////////////
$('#addRenovationForm').submit(function(e) {
    e.preventDefault();

    if (!($('#renovationPropertySelect').val() != "Choose your property" &&
            ($('#nameRenovationInput').val() != "Choose your renovation" ||
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

    form.append('quantity', $('#quantityRenovationInput').val());
    form.append('cost', $('#costRenovationInput').val());
    form.append('supplier', $('#supplierRenovationInput').val());
    form.append('invoiceDate', $('#invoiceDateRenovationInput').val());

    var propertyDetails = $('#renovationPropertySelect').val();
    var res = propertyDetails.split(" ");

    var propertyLocation = res[0];

    var propertyID = res[1];
    form.append('propertyID', res[1]);

    var userID = res[2];
    form.append('userID', res[2]);

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
                $("#" + propertyLocation + "tbody").load("../php/RenovationModule/renovationTable.php?id=" + propertyID + "&location=" + propertyLocation);
                $("#dashboardTab").load("../WebApp/tabs/dashboardTab.php");
                swal({ title: "Renovation added!", type: "success", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
                $("#" + propertyLocation + "tbody").load("../php/RenovationModule/renovationTable.php?id=" + propertyID + "&location=" + propertyLocation);

            } else {
                swal({ title: "Error!", text: "Details entered are unsupported", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
            }
        }
    });
});
