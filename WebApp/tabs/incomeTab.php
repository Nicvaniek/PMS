<div class='container'>
    <div class='row'>
        <div class='col m12'>
            <h3>Your Income</h3>
        </div>
    </div>
    <div class='row'>
    
    </div>
    <div class='row'>
        <div class='col m10'>
            <h3>Add Income</h3>
        </div>
        <div class='col m2'>
            <br>
            <p>
                <input type='checkbox' id='customIncome' onclick='customIncome()' />
                <label for='customIncome'>Custom Income</label>
            </p>
        </div>
    </div>
    <form id='addIncomeForm' action='#' method='post'>
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
            <div id='incomeSelectDiv' class='input-field col m8'>
                <select id='nameIncomeInput' class='validate' required>
                    <optgroup label=' WALL AND FLOOR COVERINGS '>
                        <option value='' disabled selected>Choose your income</option>
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
                <label>Income</label>
            </div>
            <div id='customIncomeDiv' class='input-field col m8 hide'>
                <input id='nameIncomeCustomInput' type='text' class='validate' required>
                <label for='customIncomeInput'>Custom Income</label>
            </div>
            <div class='input-field col m2'>
                <input id='amountIncomeInput' type='number' class='validate' required>
                <label for='amountIncomeInput'>Amount</label>
            </div>
            <div class='input-field col m2'>
                    <select id='occurrenceIncomeInput'>
                    <option value='Monthly'>Monthly</option>
                    <option value='Weekly'>Weekly</option>
                </select>
                <label>Occurrence</label>
            </div>
        </div>
        <div class='row'>
            <div class='input-field col m6'>
                <input id='payeeIncomeInput' type='text' class='validate' required>
                <label for='payeeIncomeInput'>Payee</label>
            </div>
            <div class='input-field col m6'>
                <input id='invoiceDateIncomeInput' type='date' class='datepicker' required>
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
                    <input id='invoiceFileIncomeInput' class='file-path validate' type='text'>
                </div>
            </div>
        </div>
        <div class='row'>
            <button id='addIncomeBtn' class='btn red darken-2 waves-effect waves-light' type='submit' name='action'>Add Income
                <i class='material-icons right'>send</i>
            </button>
        </div>
    </form>
</div>