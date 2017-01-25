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
});