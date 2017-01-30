<?php 

	require_once 'include/DB_Connect.php';
	$id = $_GET['id'];
	if (isset($_GET['id'])) 
    {
    	$sql ="SELECT * FROM Renovations WHERE ID = $id";
    	$result = mysqli_query($conn, $sql);
        $row = $result->fetch_assoc();
    }
?>

<script src="../js/init.js"></script>
<div class="modal-content">
	<div class='col m10'>
        <h4>Edit Renovation</h4>
    </div>
	<form id='addRenovationForm' action='#' method='post' enctype='multipart/form-data'>
        <div class='row'>
            <div class='input-field col m8'>
                <select>
                    <option value='' disabled selected>Choose your property</option>
                    <option value='1'>Property 1</option>
                    <option value='2'>Property 2</option>
                    <option value='3'>Property 3</option>
                </select>
                <label>Property</label>
            </div>
        </div>
        <div class='row'>
            <div id='' class='input-field col m8'>
                <input id='214' value='<?php echo $row['Name']?>' type='text' class='validate' required>
                <label for='214'>Renovation</label>
            </div>
            <div class='input-field col m2'>
                <input id='quantityRenovationInput' type='number' class='validate' required>
                <label for='quatnityRenovationInput'>Quantity</label>
            </div>
            <div class='input-field col m2'>
                <input id='costRenovationInput' type='number' class='validate' required>
                <label for='costRenovationInput'>Cost</label>
            </div>
        </div>
        <div class='row'>
            <div class='input-field col m6'>
                <input id='supplierRenovationInput' type='text' class='validate' required>
                <label for='supplierRenovationInput'>Supplier</label>
            </div>
            <div class='input-field col m6'>
                <input id='invoiceDateRenovationInput' type='date' class='datepicker' required>
                <label for='invoiceDatePicker'>Invoice Date</label>
            </div>
        </div>
    </form>
    <form id='addRenovationFileForm' action='#' method='post' enctype='multipart/form-data'>
        <div class='row'>
            <div class='file-field input-field s4'>
                <div class='btn red darken-2'>
                    <span>Invoice</span>
                    <input id='invoiceFileRenovationInput' type='file'>
                </div>
                <div class='file-path-wrapper'>
                    <input class='file-path validate' type='text'>
                </div>
            </div>
        </div>
        <div class='row'>
            <button id='addRenovationBtn' class='btn red darken-2 waves-effect waves-light' type='submit' name='action'>Add Renovation
                <i class='material-icons right'>send</i>
            </button>
        </div>
    </form>
</div>
<div class="modal-footer">
	<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
</div>
