var customRenovationCount = 0;
function customRenovation()
{
    customRenovationCount++;
    if (customRenovationCount % 2 == 1) 
    {
        document.getElementById("renovationSelectDiv").className += " hide";
        document.getElementById("customRenovationDiv").className = document.getElementById("customRenovationDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
    else
    {
        document.getElementById("customRenovationDiv").className += " hide";
        document.getElementById("renovationSelectDiv").className = document.getElementById("renovationSelectDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
}

var customExpenseCount = 0;
function customExpense()
{
    customExpenseCount++;
    if (customExpenseCount % 2 == 1) 
    {
        document.getElementById("expenseSelectDiv").className += " hide";
        document.getElementById("customExpenseDiv").className = document.getElementById("customExpenseDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
    else
    {
        document.getElementById("customExpenseDiv").className += " hide";
        document.getElementById("expenseSelectDiv").className = document.getElementById("expenseSelectDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
}

var customSalesCostCount = 0;
function customSalesCost()
{
    customSalesCostCount++;
    if (customSalesCostCount % 2 == 1) 
    {
        document.getElementById("salesCostSelectDiv").className += " hide";
        document.getElementById("customSalesCostDiv").className = document.getElementById("customSalesCostDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
    else
    {
        document.getElementById("customSalesCostDiv").className += " hide";
        document.getElementById("salesCostSelectDiv").className = document.getElementById("salesCostSelectDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
}

var customIncomeCount = 0;
function customIncome()
{
    customIncomeCount++;
    if (customIncomeCount % 2 == 1) 
    {
        document.getElementById("incomeSelectDiv").className += " hide";
        document.getElementById("customIncomeDiv").className = document.getElementById("customIncomeDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
    else
    {
        document.getElementById("customIncomeDiv").className += " hide";
        document.getElementById("incomeSelectDiv").className = document.getElementById("incomeSelectDiv").className.replace(/(?:^|\s)hide(?!\S)/g, '');
    }
}