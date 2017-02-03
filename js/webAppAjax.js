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
                    swal({ title: "Renovation added!", type: "success", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });

                } else {
                    swal({ title: "Error!", text: "Details entered are unsupported", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
                }
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////
//                          Property                                 //
///////////////////////////////////////////////////////////////////////
$('#addPropertyBtn').on('click', function(e) {
    e.preventDefault();

    var userId1 = $('#userIDPropertyInput').val();
    var name1 = $('#namePropertyInput').val();
    var amount1 = $('#purchaseAmountPropertyInput').val();
    var propertyLocation1 = $('#locationPropertyInput').val();

    $.post('../php/RenovationModule/addRenovation.php', {
        userID: userId1,
        discription: name1,
        amount: amount1,
        location: propertyLocation1
    }, function(d) {
        if (d != "") {

            swal({ title: "Property added!", type: "success", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });

        } else {
            swal({ title: "Error!", text: "Details entered are unsupported", type: "error", confirmButtonText: "Close", confirmButtonColor: "#d32f2f" });
        }
    });

});


///////////////////////////////////////////////////////////////////////
//                          Expenses                                 //
///////////////////////////////////////////////////////////////////////
$('#addExpenseBtn').on('click', function(e) {
    e.preventDefault();

    var name1 = $('#nameExpenseInput').val();
    if (document.getElementById("expenseSelectDiv").classList.contains("hide")) {
        name1 = $('#nameExpenseCustomInput').val();
    }

    var cost1 = $('#costExpenseInput').val();
    var occurrence1 = $('#occurrenceExpenseInput').val();
    var paidTo1 = $('#paidToExpenseInput').val();
    var invoiceDate1 = $('#invoiceDateExpenseInput').val();
    var invoiceFile1 = $('#invoiceFileExpenseInput').val();

    /*alert(name1);
    alert(occurrence1);
    alert(cost1);
    alert(paidTo1);
    alert(invoiceDate1);*/

    $.post('../php/addExpense.php', {
        expenseName: name1,
        occurrence: occurrence1,
        cost: cost1,
        paidTo: paidTo1,
        invoiceDate: invoiceDate1,
        invoiceFile: invoiceFile1

    }, function(d) {
        if (d != "")
            alert(d);
        else {
            $('#addExpenseForm').submit();
        }
    });
});

///////////////////////////////////////////////////////////////////////
//                          Sales Costs                              //
///////////////////////////////////////////////////////////////////////
$('#addSalesCostBtn').on('click', function(e) {
    e.preventDefault();

    var name1 = $('#nameSalesCostInput').val();
    if (document.getElementById("salesCostSelectDiv").classList.contains("hide")) {
        name1 = $('#nameSalesCostCustomInput').val();
    }

    var cost1 = $('#costSalesCostInput').val();
    var paidTo1 = $('#paidToSalesCostInput').val();
    var invoiceDate1 = $('#invoiceDateSalesCostInput').val();
    var invoiceFile1 = $('#invoiceFileSalesCostInput').val();

    /*alert(name1);
    alert(cost1);
    alert(paidTo1);
    alert(invoiceDate1);*/

    $.post('../php/addSalesCost.php', {
        salesCostName: name1,
        cost: cost1,
        paidTo: paidTo1,
        invoiceDate: invoiceDate1,
        invoiceFile: invoiceFile1

    }, function(d) {
        if (d != "")
            alert(d);
        else {
            $('#addSalesCostForm').submit();
        }
    });
});

///////////////////////////////////////////////////////////////////////
//                            Income                                //
///////////////////////////////////////////////////////////////////////
$('#addIncomeBtn').on('click', function(e) {
    e.preventDefault();

    var name1 = $('#nameIncomeInput').val();
    if (document.getElementById("incomeSelectDiv").classList.contains("hide")) {
        name1 = $('#nameIncomeCustomInput').val();
    }

    var amount1 = $('#amountIncomeInput').val();
    var occurrence1 = $('#occurrenceIncomeInput').val();
    var payee1 = $('#payeeIncomeInput').val();
    var invoiceDate1 = $('#invoiceDateIncomeInput').val();
    var invoiceFile1 = $('#invoiceFileIncomeInput').val();

    alert(name1);
    alert(amount1);
    alert(payee1);
    alert(invoiceDate1);

    $.post('../php/addIncome.php', {
        incomeName: name1,
        amount: amount1,
        occurrence: occurrence1,
        payee: payee1,
        invoiceDate: invoiceDate1,
        invoiceFile: invoiceFile1

    }, function(d) {
        if (d != "")
            alert(d);
        else {
            $('#addIncomeForm').submit();
        }
    });
});
