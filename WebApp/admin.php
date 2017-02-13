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

    // Retrieve user details
    include '../php/connectDB.php';
    $id = $_SESSION['ID'];
    $sql = "SELECT * FROM Users WHERE user_id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) 
    {
        $row = mysqli_fetch_assoc($result);
    }
    mysqli_close($conn);

    $idtest = $row['user_id'];
    $address = $row['address'];
    $cell = $row['cellNumber'];
    $province = $row['province'];
    $reference = $row['reference'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <title>Property Investor</title>
    <!-- CSS  -->

    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="../css/inputColor.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link rel="stylesheet" href="../css/font-awesome/css/font-awesome.min.css">
    <script src="../js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="../css/sweetalert.css">
    <script type="text/javascript" src = "../js/script.js"></script>
    <script type="text/javascript" src = "../js/search.js"></script>
    <script src="../js/jquery.validate.js"></script>
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
    <nav>
    <div class="nav-wrapper red darken-2">
      <a href="#" class="brand-logo">Propery Investor</a>
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
    </div>
  </nav>
  <?php
    // Get summaries to display on cards
    $server = "localhost";
    $username = "morning2";
    $password = "cm7RQ73jf9";
    $database = "morning2_PropertyInvestor";

    // Create Connection
    $conn2 = mysqli_connect($server, $username, $password, $database);

    // Test Connection
    if (!$conn2)
    {
        die("Connection Failed: " . mysqli_connect_error());
    }

    # Get number of users
    $sql2 = "SELECT * FROM Users";
    $result2 = mysqli_query($conn2, $sql2);

    $noUsers = mysqli_num_rows($result2);

    # Get most poplar subscription
    $sql3 = "SELECT * FROM Users WHERE Subscription_ID = 5";
    $result3 = mysqli_query($conn2, $sql3);
    $sql4 = "SELECT * FROM Users WHERE Subscription_ID = 6";
    $result4 = mysqli_query($conn2, $sql4);
    $sql5 = "SELECT * FROM Users WHERE Subscription_ID = 7";
    $result5 = mysqli_query($conn2, $sql5);
    $sql6 = "SELECT * FROM Users WHERE Subscription_ID = 8";
    $result6 = mysqli_query($conn2, $sql6);
    $sql7 = "SELECT * FROM Users WHERE Subscription_ID = 9";
    $result7 = mysqli_query($conn2, $sql7);

    $DayFree = mysqli_num_rows($result3);
    $month1 = mysqli_num_rows($result4);
    $month3 = mysqli_num_rows($result5);
    $month6 = mysqli_num_rows($result6);
    $year = mysqli_num_rows($result7);

    $best = "";
    if (max($DayFree, $month1, $month3, $month6, $year) == $DayFree)
    {
        $best = "7 Day free trial ($DayFree Subscriptions)";
    }
    if (max($DayFree, $month1, $month3, $month6, $year) == $month1)
    {
        if ($best == "")
            $best = "1 Month ($month1 Subscriptions)";
        else
            $best .= " & 1 Month ($month1 Subscriptions)"; 
    }
    if (max($DayFree, $month1, $month3, $month6, $year) == $month3)
    {
        if ($best == "")
            $best = "3 Month ($month3 Subscriptions)";
        else
            $best .= " & 3 Month ($month3 Subscriptions)"; 
    }
    if (max($DayFree, $month1, $month3, $month6, $year) == $month6)
    {
        if ($best == "")
            $best = "6 Month ($month6 Subscriptions)";
        else
            $best .= " & 6 Month ($month6 Subscriptions)"; 
    }
    if (max($DayFree, $month1, $month3, $month6, $year) == $year)
    {
        if ($best == "")
            $best = "1 Year ($year Subscriptions)";
        else
            $best .= " & 1 Year ($year Subscriptions)"; 
    }

    mysqli_close($conn2);
  ?>
  <div class='row'>
        <div class='col m12'>
            <h4>Accounts Summary</h4>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m3">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Number of Users</span>
              <span><h1 align="center"> <?php echo $noUsers; ?> </h1></span>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Income for <?php echo date('F'); ?></span>
              
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Most popular Subscription</span><br>
              <span><?php echo $best;?></span>  
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Overdue Subsciptions</span><br>
              
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
      <?php
    include '../php/connectDB.php';
    $sql = "SELECT * FROM Users JOIN Subscriptions ON Users.Subscription_ID = Subscriptions.Subscription_ID";
    $result = mysqli_query($conn, $sql);
    
    mysqli_close($conn);
?>
<div class='row'>
  <div class="col m6 s12 l6 offset-m3 offset-l3">
    <h4 align="center">List of Users</h4>
  </div>
</div>
<div class="row">
    <div class="col m6 s12 l6 offset-m3 offset-l3">
        <form>
        <div class="input-field">
          <input id="search" type="search" onkeyup="showResult(this.value)">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
</div>
<div class="row">
  <div class="col m6 s12 l6 offset-m3 offset-l3" style="overflow:auto; height:400px;">
    <ul class="collapsible popout" data-collapsible="accordion" id="livesearch">
      <?php
        while($row = mysqli_fetch_assoc($result))
        {?>
          <li id="<?php echo $row['user_id']; ?>">
            <div class="collapsible-header"><i class="fa fa-user" aria-hidden="true"></i><?php echo $row['firstName']." ".$row['lastName']?></div>
            <div class="collapsible-body" style="padding:10px">
              <strong>Email:</strong> <?php echo $row['email']; ?> <br>
              <strong>Active Account?:</strong> <?php echo $row['active']; ?> <br>
              <strong>Cellphone Number:</strong> <?php echo $row['cellNumber']; ?> <br>
              <strong>Address:</strong> <?php echo $row['address']; ?> <br>
              <strong>Province:</strong> <?php echo $row['province']; ?> <br>
              <strong>Reference:</strong> <?php echo $row['reference']; ?> <br>
              <strong>Subscription Plan:</strong> <?php echo $row['Plan']; ?> <br><br>
              <?php 
                if ($row['user_id'] != $_SESSION['ID'])
                {?>
                  <button class="btn waves-effect waves-light deleteAccount3rd" type="submit" name="action" style="margin-bottom:10px; background-color:#D9534F">Delete Account <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                <?php
                }?>
                <?php 
                if ($row['admin'] != 1)
                {?>
                  <button class="btn waves-effect waves-light makeAdmin" type="submit" name="action" style="margin-bottom:10px; background-color:##5bc0de">Make Admin <i class="fa fa-lock" aria-hidden="true"></i></button>
                <?php
                }?>
            </div>
          </li>
        <?php

        } 
        mysqli_close($conn);
      ?>  
    </ul>
  </div>
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
    <script src="../js/init.js"></script>
    <script src="../js/webAppAjax.js"></script>
    <script src="../js/webAppCustoms.js"></script>

    <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div class="modal-content">
                <h4 style="margin-bottom:30px">About Me</h4>
                <form action="index.php" method="post" id = "settingsForm">
                    <input type="hidden" name="userId" id = "userId" value="<?php echo $idtest; ?>">
                    <div class="row">
                        <div class="input-field">
                            <i class="fa fa-mobile prefix" aria-hidden="true"></i>
                            <input id="cellNo" type="text" class="validate" name="cellNo" value="<?php echo $cell; ?>">
                            <label for="cellNo">Cellphone number</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="fa fa-home prefix" aria-hidden="true"></i>
                            <input id="address" type="text" class="validate" name="address" value="<?php echo $address; ?>">
                            <label for="address">Physical Address</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="fa fa-map-marker prefix" aria-hidden="true"></i>
                            <select class="validate" id = "province" name="province">
                              <option value="" disabled selected><?php if ($province != ""){echo $province;}else{echo "Province";}?></option>
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
                              <option value="" disabled selected><?php if ($reference != ""){echo $reference;}else{echo "Where did you hear about us?";}?></option>
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
                    <input type="hidden" name="sesID" id = "sesID" value="<?php echo $_SESSION['ID']?>">
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
</body>

</html>