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
    <script src="js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="css/sweetalert.css">
</head>
<body>
<?php
    // Only if user is trying to login
    if (isset($_POST['passLogin']))
    {
        session_start();
        include 'php/connectDB.php';

        // Get values from form
        $email = $_POST["emailL"];
        $password = $_POST["passLogin"];

        // Check if user exists
        $sql = "SELECT * FROM Users WHERE email = '$email' AND active = '1'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0)
        {
            $row = mysqli_fetch_assoc($result);
            if(password_verify($password, $row['password']))
            {
                $_SESSION['Name'] = $row['firstName'];
                $_SESSION['Email'] = $row['email'];
                $_SESSION['ID'] = $row['user_id'];
                $_SESSION['Surname'] = $row['lastName'];

               echo "<script>window.top.location='https://www.facebook.com/'</script>";
            }
            else
            {
                echo '<script>swal({title: "Login Failed!",   text: "Invalid details entered",   type: "error",   confirmButtonText: "Close", confirmButtonColor:"#B71C1C" });</script>';
            }
        }
        else
        {
            echo '<script>swal({title: "Login Failed!",   text: "Please make sure that you enter the correct details and that you have activated your account",   type: "error",   confirmButtonText: "Close", confirmButtonColor:"#B71C1C" });</script>';
        }
        mysqli_close($conn);
    }
?>
    <div class="container">
        <div class="row">
            <div class="card col s12 m4 offset-m4">
              <div class="cardContainer">
                <h3 style="margin-bottom:40px">Login</h3>
                <form action="login.php" method="post">
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">email</i>
                            <input id="email" type="email" class="validate" name="emailL" required>
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="pass1" type="password" class="validate" name="passLogin" required>
                            <label for="pass1">Password</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" id="loginBtn" style="margin-bottom:10px">Login
                        <i class="material-icons right">send</i>
                    </button><br>
                    Don't have an account? <a href="index.php">Sign up here</a><br>
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
