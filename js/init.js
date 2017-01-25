(function($) {
    $(function() {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('select').material_select();
        $('.datepicker').pickadate({
            format: 'yyyy-mm-dd',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year

        });
        $('input.autocomplete').autocomplete({
            data: {
                "Apple": null,
                "Microsoft": null,
                "Google": 'http://placehold.it/250x250'
            }
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space
