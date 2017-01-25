$('#addRenovationBtn').on('click', function(e) {
    e.preventDefault();
    var name1 = $('#renovationNameInput').value;
    var quantity1 = $('#quantityInput').value;
    var cost1 = $('#costInput').value;
    var supplier1 = $('#supplierInput').value;
    var invoiceDate1 = $('#invoiceDateInput').value;
    var invoiceFile1 = $('#invoiceFileInput').value;

    $.post('../php/addRenovation.php', {
        renovationName: name1,
        quantity: quantity1,
        cost: cost1,
        supplier: supplier1,
        invoiceDate: invoiceDate1,
        invoiceFile: invoiceFile1

    }, function(d) {
     alert("kyle");
        if (d != "")
            alert(d);
        else
        {
        	alert("heloooo")
            $('#addRenovationForm').submit();
        }
    });
});
