<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <title>Materialize</title>
    <!-- CSS  -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="../css/style.css" type="text/css" rel="stylesheet" media="screen,projection" />
</head>
<body>
    <div class="container">
        <?php
            include 'connectDB.php';
                         
            if(isset($_GET['email']) && !empty($_GET['email']) AND isset($_GET['hash']) && !empty($_GET['hash']))
            {
                $email = mysql_escape_string($_GET['email']); 
                $hash = mysql_escape_string($_GET['hash']); 

                $sql = "SELECT email, hash, active FROM Users WHERE email='$email' AND hash='$hash' AND active='0'";
                $result = mysqli_query($conn, $sql);

                if (mysqli_num_rows($result) > 0)
                {
                    $sql = "UPDATE Users SET active= '1' WHERE email='$email' AND hash='$hash' AND active='0'";
                    $result = mysqli_query($conn, $sql);
                    echo "<div class='alert alert-success'><strong>Success!</strong> You have successfully activated your account. Click <a href = '../login.php'>here</a> to login</div>";

                }
                else
                {
                    echo "<div class='alert alert-danger'><strong>Error!</strong> The url is either invalid or you have already activated your account</div>";
                }
                             
            }
            else
            {
                echo "<div class='alert alert-danger'><strong>Error!</strong> Invalid approach, please use the link that has been sent to your email</div>";
            }
            mysqli_close($conn);
        ?>
    </div>
    <!--  Scripts-->
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="../js/materialize.js"></script>
    <script src="../js/init.js"></script>
    <script type="text/javascript" src = "../js/script.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
</body>

</html>
