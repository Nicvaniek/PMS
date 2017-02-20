<?php 
    session_start();
?>
<div class='container'>
    <div class='row'>
        <div class='col m10'>
            <h4>Add Property</h4>
        </div>
    </div>
    <form id='addPropertyForm' action='#' method='post' enctype='multipart/form-data'>
        <div class='row'>
            <div class='input-field col m12 s12'>
                <i class="material-icons prefix">info_outline</i>
                <input id='namePropertyInput' type='text' class='validate' required>
                <label for='namePropertyInput'>Discription</label>
            </div>
            <!-- <div class='col m2'>
                <br>
                <p>
                    <input type='checkbox' id='freeStanding' onclick='' />
                    <label for='freeStanding'>Free Standing</label>
                </p>
            </div>
            <div class='col m2'>
                <br>
                <p>
                    <input type='checkbox' id='complex' onclick='' />
                    <label for='complex'>Complex</label>
                </p>
            </div>
            <div class='col m2'>
                <br>
                <p>
                    <input type='checkbox' id='apartment' onclick='' />
                    <label for='apartment'>Apartment</label>
                </p>
            </div> -->
        </div>
        <div class="row">
            <div class='input-field col m6 s12'>
                <i class="material-icons prefix">shopping_cart</i>
                <input id='purchaseAmountPropertyInput' type='number' class='validate' required>
                <label for='purchaseAmountPropertyInput'>Purchase Amount</label>
            </div>
            <div class='input-field col m6 s12'>
                <i class="material-icons prefix">location_on</i>
                <input id='locationPropertyInput' type='text' class='validate' required>
                <label for='locationPropertyInput'>Location</label>
            </div>
        </div>
        <div class='row'>
            <div class='input-field col m3 s12'>
                <i class="material-icons prefix">mode_edit</i>
                <input id='houseNumberPropertyInput' type='number' class='validate' required>
                <label for='houseNumberPropertyInput'>House Number</label>
            </div>
            <div class='input-field col m3 s12'>
                <i class="material-icons prefix">mode_edit</i>
                <input id='stanSizePropertyInput' type='number' class='validate' required>
                <label for='stanSizePropertyInput'>Stand Size (m^2)</label>
            </div>
            <div class='input-field col m3 s12'>
                <i class="material-icons prefix">mode_edit</i>
                <input id='coveredAreaPropertyInput' type='number' class='validate' required>
                <label for='coveredAreaPropertyInput'>Covered Area (m^2)</label>
            </div>
            <div class='input-field col m3 s12'>
                <i class="material-icons prefix">mode_edit</i>
                <input id='uncoveredAreaPropertyInput' type='number' class='validate' required>
                <label for='uncoveredAreaPropertyInput'>uncovered Area (m^2)</label>
            </div>
        </div>
        <div class='row hide'>
        <input id='userIDPropertyInput' type='number' value="<?php echo $_SESSION['ID'];?>">
        </div>
        <div class='row'>
            
            <button id='addPropertyBtn' class='btn red darken-2 waves-effect waves-light' type='submit' name='action'>Add Property
                <i class='material-icons right'>send</i>
            </button>
            <br>
            <br>
        </div>
    </form>
</div>
