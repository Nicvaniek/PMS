///////////////////////////////////////////////////////////////////////
//                          Renovations                              //
///////////////////////////////////////////////////////////////////////
$('#addRenovationBtn').on('click', function(e) {
    e.preventDefault();
    
    var name1 = $('#nameRenovationInput').val();
    if (document.getElementById("renovationSelectDiv").classList.contains("hide")) 
    {
        name1 = $('#nameRenovationCustomInput').val();
    }

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
    document.getElementById("renovationsTab").innerHTML = "";
    $("#renovationsTab").load("../WebApp/tabs/testTab.php");
    
});
///////////////////////////////////////////////////////////////////////
//                          Expenses                                 //
///////////////////////////////////////////////////////////////////////
$('#addExpenseBtn').on('click', function(e) {
    e.preventDefault();

    var name1 = $('#nameExpenseInput').val();
    if (document.getElementById("expenseSelectDiv").classList.contains("hide")) 
    {
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
        else
        {
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
    if (document.getElementById("salesCostSelectDiv").classList.contains("hide")) 
    {
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
        else
        {
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
    if (document.getElementById("incomeSelectDiv").classList.contains("hide")) 
    {
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
        else
        {
            $('#addIncomeForm').submit();
        }
    });
});
