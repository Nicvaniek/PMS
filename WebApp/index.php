<?php 
    session_start();
    // Make sure logged out user cannot enter
    if ($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        if (!isset($_SESSION['Name']))
            header('Location: ../login.php');
    } 
    else 
    {
        include '../php/update-details.php';
    }
    include '../php/connectDB.php';
    $id = $_SESSION['ID'];
    $sql = "SELECT * FROM Users WHERE user_id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) 
    {
        $row = mysqli_fetch_assoc($result);
    }
    mysqli_close($conn);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <title>Property Investor</title>
    <!-- CSS  -->
<<<<<<< HEAD
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="../css/inputColor.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="../js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="../css/sweetalert.css">
=======
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="../css/inputColor.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link rel="stylesheet" href="../css/font-awesome/css/font-awesome.min.css">
    <script src="../js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="../css/sweetalert.css">
    <script type="text/javascript" src = "../js/script.js"></script>
>>>>>>> refs/remotes/origin/master
</head>

<body class="grey lighten-5">
    <!-- Dropdown Structure -->
    <ul id="dropdown1" class="dropdown-content">
      <li><a href="#modal1">About me</a></li>
      <li><a href="#modal2">Account</a></li>
    </ul>
    <ul id="dropdown2" class="dropdown-content">
      <li><a href="#modal1">About me</a></li>
      <li><a href="#modal2">Account</a></li>
    </ul>
    <nav class="nav-extended">
        <div class="nav-wrapper red darken-2">
            <a href="#" class="brand-logo">Property Investor</a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="#"><i class="fa fa-user" aria-hidden="true"></i> <?php echo $_SESSION['Name'] ?></a></li>
                <li><a href="../login.php"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                <li><a class="dropdown-button" href="#!" data-activates="dropdown1">Settings<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
                <li><a href="#"><i class="fa fa-user" aria-hidden="true"></i> <?php echo $_SESSION['Name'] ?></a></li>
                <li><a href="../login.php"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                <li><a class="dropdown-button" href="#!" data-activates="dropdown2">Settings<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
<ul class="tabs tabs-transparent tabs-fixed-width center">
                <li class="tab"><a href="#dashboardTab">Dashboard</a></li>
                <li class="tab"><a href="#propertyInformationTab">Property Information</a></li>
                <li class="tab"><a href="#renovationsTab">Renovations</a></li>
                <li class="tab"><a href="#expensesTab">Expenses</a></li>
                <li class="tab"><a href="#salesCostsTab">Sales Costs</a></li>
                <li class="tab"><a href="#incomeTab">Income</a></li>
            </ul>
        </div>
    </nav>
    <div id="dashboardTab" class="col m12">
        <?php include 'tabs/dashboardTab.php'; ?>
    </div>
    <div id="propertyInformationTab" class="col m12">
    </div>
    <div id="renovationsTab" class="col m12">
        <?php include 'tabs/testTab.php'; ?>
    </div>
    <div id="expensesTab" class="col m12">
    </div>
    <div id="salesCostsTab" class="col m12">
    </div>
    <div id="incomeTab" class="col m12">
    </div>
    <div class="container">
    </div>
    <footer class="page-footer red darken-2">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Company Bio</h5>
                    <p class="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                </div>
                <div class="col l3 s12">
                    <h5 class="white-text">Settings</h5>
                    <ul>
                        <li><a class="white-text" href="#!">Link 1</a></li>
                        <li><a class="white-text" href="#!">Link 2</a></li>
                        <li><a class="white-text" href="#!">Link 3</a></li>
                        <li><a class="white-text" href="#!">Link 4</a></li>
                    </ul>
                </div>
                <div class="col l3 s12">
                    <h5 class="white-text">Connect</h5>
                    <ul>
                        <li><a class="white-text" href="#!">Link 1</a></li>
                        <li><a class="white-text" href="#!">Link 2</a></li>
                        <li><a class="white-text" href="#!">Link 3</a></li>
                        <li><a class="white-text" href="#!">Link 4</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                Made by <a class="white-text" href="http://www.unhinged.co.za">Unhinged</a>
            </div>
        </div>
    </footer>
    <div id="editModal" class="modal modal-fixed-footer">

    </div>
    <script src="../js/materialize.js"></script>
<<<<<<< HEAD
        <script src="../js/init.js"></script>
        <script src="../js/webAppAjax.js"></script>
        <script src="../js/webAppCustoms.js"></script>
=======
    <script src="../js/init.js"></script>
    <script src="../js/webAppAjax.js"></script>
    <script src="../js/webAppCustoms.js"></script>

    <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div class="modal-content">
                <h4 style="margin-bottom:30px">About Me</h4>
                <form action="index.php" method="post" id = "settingsForm">
                    <input type="hidden" name="userId" id = "userId" value="<?php echo $row['user_id']?>">
                    <div class="row">
                        <div class="input-field">
                            <i class="fa fa-mobile prefix" aria-hidden="true"></i>
                            <input id="cellNo" type="text" class="validate" name="cellNo" value="<?php echo $row['cellNumber']?>">
                            <label for="cellNo">Cellphone number</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="fa fa-home prefix" aria-hidden="true"></i>
                            <input id="address" type="text" class="validate" name="address" value="<?php echo $row['address']?>">
                            <label for="address">Physical Address</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="fa fa-map-marker prefix" aria-hidden="true"></i>
                            <select class="validate" id = "province" name="province">
                              <option value="" disabled selected><?php if ($row['province'] != ""){echo $row['province'];}else{echo "Province";}?></option>
                              <option value="Limpopo">Limpopo</option>
                              <option value="Gauteng">Gauteng</option>
                              <option value="Free State">Free State</option>
                              <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                              <option value="Mpumalanga">Mpumalanga</option>
                              <option value="North West">North West</option>
                              <option value="Northen Cape">Northen Cape</option>
                              <option value="Eastern Cape">Eastern Cape</option>
                              <option value="Western Cape">Western Cape</option>
                            </select>
                            <label>Province</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="fa fa-map-marker prefix" aria-hidden="true"></i>
                            <select class="validate" id = "reference" name="reference">
                              <option value="" disabled selected><?php if ($row['reference'] != ""){echo $row['reference'];}else{echo "Where did you hear about us?";}?></option>
                              <option value="Word of mouth">Word of mouth</option>
                              <option value="Advertising">Advertising</option>
                              <option value="Unhinged website">Unhinged website</option>
                              <option value="Other">Other</option>
                            </select>
                            <label>Where did you hear about us?</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" id="settingsBtn" style="margin-bottom:10px">Save
                        <i class="fa fa-floppy-o right" aria-hidden="true"></i>
                    </button>
                </form>
                <!--<button class="btn waves-effect waves-light" type="submit" name="action" id="deleteAccount" style="margin-bottom:10px; background-color:#D9534F">Delete Account 
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>-->
            </div>
            <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
      </div>
      <!-- Modal Structure -->
        <div id="modal2" class="modal">
            <div class="modal-content">
                <h4 style="margin-bottom:30px">Account</h4>
                <form action="index.php" method="post" id = "accountForm">
                    <input type="hidden" name="userId" id = "userId" value="<?php echo $row['user_id']?>">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="fa fa-map-marker prefix" aria-hidden="true"></i>
                            <select class="validate" id = "subPlan" name="subPlan">
                              <option value="" disabled selected>Subscription Plan</option>
                              <option value="7 days Free">7 days Free</option>
                              <option value="1 Month">1 Month</option>
                              <option value="3 Month">3 Month</option>
                              <option value="6 Month">6 Month</option>
                              <option value="1 Year pay 10 month">1 year pay 10 month</option>
                            </select>
                            <label>Subscription Plan</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" id="saveBtn2" style="margin-bottom:10px">Save
                        <i class="fa fa-floppy-o right" aria-hidden="true"></i>
                    </button>
                </form>
                <button class="btn waves-effect waves-light" type="submit" name="action" id="deleteAccount" style="margin-bottom:10px; background-color:#D9534F">Delete Account 
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
            </div>
            <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
      </div>
>>>>>>> refs/remotes/origin/master
</body>

</html>