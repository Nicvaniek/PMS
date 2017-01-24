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
                <h3 style="margin-bottom:40px">Login</h3>
                <form action="" method="post">
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">email</i>
                            <input id="email" type="email" class="validate" name="email">
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="pass1" type="password" class="validate" name="pass1">
                            <label for="pass1">Password</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" id="regBtn">Login
                        <i class="material-icons right">send</i>
                    </button>
                    Don't have an account? <a href="register.php">Sign up here</a><br>
                    <a href="register.php">Forgot password?</a>
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
