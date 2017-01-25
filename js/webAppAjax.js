$('#addRenovationBtn').on('click', function(e) {
    e.preventDefault();
    var name1 = $('#nameRenovationInput').val();
    var quantity1 = $('#quantityRenovationInput').val();
    var cost1 = $('#costRenovationInput').val();
    var supplier1 = $('#supplierRenovationInput').val();
    var invoiceDate1 = $('#invoiceDateRenovationInput').val();
    var invoiceFile1 = $('#invoiceFileRenovationInput').val();

    /*alert(name1);
    alert(quantity1);
    alert(cost1);
    alert(supplier1);
    alert(invoiceDate1);*/

    $.post('../php/addRenovation.php', {
        renovationName: name1,
        quantity: quantity1,
        cost: cost1,
        supplier: supplier1,
        invoiceDate: invoiceDate1,
        invoiceFile: invoiceFile1

    }, function(d) {
        if (d != "")
            alert(d);
        else
        {
            $('#addRenovationForm').submit();
        }
    });
});
///////////////////////////////////////////////////////////////////////
//                          Expenses                                 //
///////////////////////////////////////////////////////////////////////
$('#addExpenseBtn').on('click', function(e) {
    e.preventDefault();
    var name1 = $('#nameExpenseInput').val();
    var cost1 = $('#costExpenseInput').val();
    var occurrence1 = $('#occurrenceExpenseInput').val();
    var paidTo1 = $('#paidToExpenseInput').val();
    var invoiceDate1 = $('#invoiceDateExpenseInput').val();
    var invoiceFile1 = $('#invoiceFileExpenseInput').val();

    alert(name1);
    alert(occurrence1);
    alert(cost1);
    alert(paidTo1);
    alert(invoiceDate1);

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
        else
        {
            $('#addExpenseForm').submit();
        }
    });
});

