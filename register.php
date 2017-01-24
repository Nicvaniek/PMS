<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <title>Materialize</title>
    <!-- CSS  -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection" />
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="card col s12 m4 offset-m4">
              <div class="cardContainer">
                <h3 style="margin-bottom:40px">Register</h3>
                <form action="" method="post">
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="fName" type="text" class="validate" name="fName">
                            <label for="fName">First Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="lName" type="text" class="validate" name="lName">
                            <label for="lName">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">email</i>
                            <input id="email" type="email" class="validate" name="email">
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">lock_open</i>
                            <input id="pass1" type="password" class="validate" name="pass1">
                            <label for="pass1">Choose password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="pass2" type="password" class="validate" name="pass2">
                            <label for="pass2">Confrim Password</label>
                        </div>
                    </div>
                    <div class="row" style="margin-left:35px">
                        <input type="checkbox" id="refCodeBox" class="filled-in"/>
                        <label for="refCodeBox">I have a referral code</label>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">receipt</i>
                            <input id="refCode" type="text" class="validate" name="refCode" disabled>
                            <label for="refCode">Referral Code</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" id="regBtn">Register
                        <i class="material-icons right">send</i>
                    </button>
                    <a href="login.php">Already have an account? Login here</a>
                </form>
              </div>
            </div>
        </div>
    </div>
    <!--  Scripts-->
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="js/materialize.js"></script>
    <script src="js/init.js"></script>
    <script type="text/javascript" src = "js/script.js"></script>
</body>

</html>
