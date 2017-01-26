<?php  
echo "
<div class='container'>
    <div class='row'>
        <div class='col m12'>
            <h3>Your Renovations</h3>
        </div>
    </div>
    <div class='row'>
        <div class='col m12'>
            <ul class='collection with-header'>
                <li class='collection-header'>
                    <h5>Cape Town Property</h5></li>
                <li class='collection-item'>
                    <div>Lights<a href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div>
                </li>
                <li class='collection-item'>
                    <div>Garden<a href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div>
                </li>
                <li class='collection-item'>
                    <div>Pool<a href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div>
                </li>
            </ul>
            <ul class='collection with-header'>
                <li class='collection-header'>
                    <h5>Lonehill Property</h5></li>
                <li class='collection-item'>
                    <div>Pool<a href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div>
                </li>
                <li class='collection-item'>
                    <div>Garage<a href='#!' class='secondary-content'><i class='material-icons'>send</i></a></div>
                </li>
            </ul>
        </div>
    </div>
    <div class='row'>
        <div class='col m10'>
            <h3>Add Renovation</h3>
        </div>
        <div class='col m2'>
            <br>
            <p>
                <input type='checkbox' id='customRenovation' onclick='customRenovation()' />
                <label for='customRenovation'>Custom Renovation</label>
            </p>
        </div>
    </div>
    <form id='addRenovationForm' action='#' method='post'>
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
            <div id='renovationSelectDiv' class='input-field col m8'>
                <select id='nameRenovationInput' class='validate' required>
                    <optgroup label=' WALL AND FLOOR COVERINGS '>
                        <option value='' disabled selected>Choose your renovation</option>
                        <option value='siekReno'>Floor Covering </option>
                        <option value='siekReno'>Vinyl </option>
                        <option value='siekReno'>Laminated </option>
                        <option value='siekReno'>Wood </option>
                        <option value='siekReno'>Cemcrete </option>
                        <option value='siekReno'>Screed </option>
                        <option value='siekReno'>Skirting </option>
                        <option value='siekReno'>Architraves </option>
                        <option value='siekReno'>Carpets </option>
                        <option value='siekReno'>Wall Tiling </option>
                    </optgroup>
                    <optgroup label=' GENERAL BUILDING WORKS '>
                        <option value='siekReno'>Ceilings </option>
                        <option value='siekReno'>Cornices </option>
                        <option value='siekReno'>Roofstructure </option>
                        <option value='siekReno'>Roof Covering </option>
                        <option value='siekReno'>Doors </option>
                        <option value='siekReno'>Locks </option>
                        <option value='siekReno'>Handels </option>
                        <option value='siekReno'>Window Quote </option>
                    </optgroup>
                    <optgroup label=' CLADDING '>
                        <option value='siekReno'>Stone</option>
                        <option value='siekReno'>Aliminium</option>
                        <option value='siekReno'>Timber</option>
                    </optgroup>
                </select>
                <label>Renovation</label>
            </div>
            <div id='customRenovationDiv' class='input-field col m8 hide'>
                <input id='nameRenovationCustomInput' type='text' class='validate' required>
                <label for='customRenovationRenovationInput'>Custom Renovation</label>
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
        <div class='row'>
            <div class='file-field input-field s4'>
                <div class='btn red darken-2'>
                    <span>Invoice</span>
                    <input type='file'>
                </div>
                <div class='file-path-wrapper'>
                    <input id='invoiceFileRenovationInput' class='file-path validate' type='text'>
                </div>
            </div>
        </div>
        <div class='row'>
            <button id='addRenovationBtn' class='btn red darken-2 waves-effect waves-light' type='submit' name='action'>Add Renovation
                <i class='material-icons right'>send</i>
            </button>
        </div>
    </form>
</div>";
?>
