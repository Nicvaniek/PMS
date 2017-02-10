///////////////////////////////////////////////////////////////////////
//                            Updates                                //
///////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
//                          Renovations                              //
///////////////////////////////////////////////////////////////////////
$('#addRenovationBtn').on('click', function(e) {
    e.preventDefault();

    var file_data = $('#invoiceFileRenovationInput').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '../php/upload.php', // point to server-side PHP script 
        dataType: 'text', // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        failure: function() {
            swal({ title: "Error!", text: "File upload unsuccessful", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
        },
        success: function(php_script_response) {
            //SUCCESS
            //alert(php_script_response); // display response from the PHP script, if any
            var uploadID1 = php_script_response; //Our invoive we uploaded

            var name1 = $('#nameRenovationInput').val();
            if (document.getElementById("renovationSelectDiv").classList.contains("hide")) {
                name1 = $('#nameRenovationCustomInput').val();
            }

            var propertyDetails = $('#renovationPropertySelect').val();
            var res = propertyDetails.split(" ");
            var propertyLocation = res[0];
            var propertyID1 = res[1];
            var userId1 = res[2];

            var quantity1 = $('#quantityRenovationInput').val();
            var cost1 = $('#costRenovationInput').val();
            var supplier1 = $('#supplierRenovationInput').val();
            var invoiceDate1 = $('#invoiceDateRenovationInput').val();

            $.post('../php/RenovationModule/addRenovation.php', {
                userID: userId1,
                propertyID: propertyID1,
                renovationName: name1,
                quantity: quantity1,
                cost: cost1,
                supplier: supplier1,
                invoiceDate: invoiceDate1,
                uploadID: uploadID1

            }, function(d) {
                if (d != "") {
                    $("#" + propertyLocation + "tbody").load("../php/RenovationModule/renovationTable.php?id=" + propertyID1 + "&location=" + propertyLocation);
                    $("#dashboardTab").load("../WebApp/tabs/dashboardTab.php");
                    swal({ title: "Renovation added!", type: "success", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
                    $("#" + propertyLocation + "tbody").load("../php/RenovationModule/renovationTable.php?id=" + propertyID1 + "&location=" + propertyLocation);

                } else {
                    swal({ title: "Error!", text: "Details entered are unsupported", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
                }
            });
        }
    });
});