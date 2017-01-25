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