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

    // Function to validate registration form
    function validateRegistration()
    {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        else if (!regex.test($('#email').val()))
        {
            swal({  
                title: "Error!",   
                text: "Please enter a valid email address",   
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
    }

    // Register new user
    $('#regBtn').on('click', function(){
        if (!validateRegistration())
            return false;
        else
        {
            var fName = $('#fName').val();
            var email1 = $('#email').val(); 
            var password1 = $('#pass1').val(); 
            var lName = $('#lName').val();
            var refcode1 = $('#refCode').val();

            $.post('php/insert-user.php',
            {
                firstName: fName,
                email: email1,
                password: password1,
                lastName: lName,
                refCode: refcode1,
            }, function(d){
                if (d === "")
                {
                    swal({
                      title: "Account Created!",
                      text: "Please check your email to verify your account",
                      type: 'success',
                      confirmButtonText: "Close",
                      confirmButtonColor: '#5cb85c'
                    }, function(){
                        $('#regForm').submit();
                    });
                }
                else
                {
                    swal({  
                        title: "Error!",   
                        text: d,   
                        type: "error",   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "Close",   
                        confirmButtonColor: '#B71C1C' 
                    }); 
                }
          });   
        }
        return false;
    });

    // Reset password
    $('#resetBtn').on('click', function(){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var resetEmail = $('#emailReset').val();
            if (!regex.test(resetEmail) || resetEmail === "")
            {
                swal({  
                    title: "Error!",   
                    text: "Please enter a valid email address",   
                    type: "error",   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Close",   
                    confirmButtonColor: '#B71C1C' 
                }); 
                return false;
            }

            $.post('php/send-recovery-email.php',
            {
                email: resetEmail,
            }, function(d){
                if (d === "")
                {
                    swal({
                      title: "Recovery email sent!",
                      text: "Please check your email to reset your password",
                      type: 'success',
                      confirmButtonText: "Close",
                      confirmButtonColor: '#5cb85c'
                    }, function(){
                        $('#resetForm').submit();
                    });
                }
                else
                {
                    swal({  
                        title: "Oops!",   
                        text: d,   
                        type: "error",   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "Close",   
                        confirmButtonColor: '#B71C1C' 
                    }); 
                }
          });   
        return false;
    });
    $('#changePassBtn').on('click', function(){
            var pass1 = $('#newPass').val();
            var pass2 = $('#newPass2').val();
            var mailAddress = $('#mail').val();

            if (pass1 != pass2)
            {
                swal({  
                    title: "Error!",   
                    text: "Passwords do not match",   
                    type: "error",   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Close",   
                    confirmButtonColor: '#B71C1C' 
                }); 
                return false;
            }

            $.post('submit-new-password.php',
            {
                email: mailAddress,
                password: pass1
            }, function(d){
                if (d === "")
                {
                    swal({
                      title: "Password successfully changed!",
                      type: 'success',
                      confirmButtonText: "Close",
                      confirmButtonColor: '#5cb85c'
                    }, function(){
                        $('#passwordForm').submit();
                    });
                }
                else
                {
                    swal({  
                        title: "Oops!",   
                        text: d,   
                        type: "error",   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "Close",   
                        confirmButtonColor: '#B71C1C' 
                    }); 
                }
          });   
        return false;
    });

    // Delete account
    $('#deleteAccount').on('click', function(){
        var id = $('#userId').val();

            swal({   
                title: "Are you sure?",   
                text: "Your account will be permanently deleted",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: true 
            }, function(){
                $.post('../php/delete-account.php',
                {
                    userId: id
                }, function(d){
                    alert(d);
                    window.location.href = "http://unhinged.co.za/Demo/Kyle1024/login.php";
                });
            });
    });

});
