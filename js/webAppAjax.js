$('#addRenovationBtn').on('click', function(e) {
    e.preventDefault();
    var name1 = $('#renovationNameInput').val();
    var quantity1 = $('#quantityInput').val();
    var cost1 = $('#costInput').val();
    var supplier1 = $('#supplierInput').val();
    var invoiceDate1 = $('#invoiceDateInput').val();
    var invoiceFile1 = $('#invoiceFileInput').val();

    /*alert(name1);
    alert(quantity1);
    alert(cost1);
    alert(supplier1);
    alert(invoiceDate1);*/

    var n = invoiceDate1.length;
    var day = invoiceDate1.substring(0, 2);
    var year = invoiceDate1.substring(n -1, n);
	var month = invoiceDate1.includes("Jan");

	alert(year);
	alert(month);
	alert(day);

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
