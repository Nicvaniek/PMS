$(document).ready(function() 
{
    $(".dropdown-button").dropdown();

    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('select').material_select();
    $('ul.tabs').tabs({
        'swipeable': true
    });

    $('#tabs-swipe-demo').tabs({ 'swipeable': true });



    $('.datepicker').pickadate({
        format: 'yyyy-mm-dd',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
});
