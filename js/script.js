$(document).ready(function(){

	// Enable or disable referreal code field
	$('#refCodeBox').change(function(){
		if (this.checked)
		{
			$('#refCode').prop('disabled', false);
		}
		else
		{
			$('#refCode').prop('disabled', true);
		}
	});

	// Input validation
	$('#regBtn').on('click', function(e){
        if ($('#fName').val() == "" || $('#lName').val() == "" || $('#email').val() == "" || $('#pass1').val() == "" || $('#pass2').val() == "")
        {
        	swal({  
                title: "Error!",   
                text: "Please fill out all fields",   
                type: "error",   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Close",   
                confirmButtonColor: '#B71C1C' 
            }); 

            return false;
        }
        else if ($('#pass1').val() != $('#pass2').val())
        {
        	swal({  
                title: "Error!",   
                text: "Passwords don't match",   
                type: "error",   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Close",   
                confirmButtonColor: '#B71C1C' 
            }); 

            return false;
        }
        else
        {
        	return true;
        }
    });
});