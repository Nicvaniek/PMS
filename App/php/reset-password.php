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
    <script src="../js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="../css/sweetalert.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="card col s12 m4 offset-m4">
              <div class="cardContainer">
                <h3 style="margin-bottom:40px">Password Reset</h3>
                <?php
                    if($_GET['key'] && $_GET['reset'])
                    {
                      $email = $_GET['key'];
                      $pass = $_GET['reset'];

                      include 'connectDB.php';

                      $sql = "SELECT * from Users where md5(email)='$email'";
                      $result = mysqli_query($conn, $sql);

                      if (mysqli_num_rows($result) == 1)
                      {
                        $row = mysqli_fetch_assoc($result);
                            ?>
                            <form action="../login.php" method="post" id = "passwordForm">
                                <?php echo '<input type="hidden" name="email" id = "mail" value="'.$email.'">'; ?>
                                <div class="row">
                                    <div class="input-field">
                                        <i class="material-icons prefix">lock_open</i>
                                        <input id="newPass" type="password" class="validate" name="newPass">
                                        <label for="newPass">Enter new password</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field">
                                        <i class="material-icons prefix">lock_outline</i>
                                        <input id="newPass2" type="password" class="validate" name="newPass2">
                                        <label for="newPass2">Confrim Password</label>
                                    </div>
                                </div>
                                <button class="btn waves-effect waves-light" type="submit" name="action" id="changePassBtn" style="margin-bottom:10px">Submit
                                    <i class="material-icons right">send</i>
                                </button>
                            </form>
                            <?php
                      }
                      else
                      {
                        echo "No account with this email";
                      }
                    }
                    else
                    {
                        echo "Invalid approach";
                    }
                ?>
              </div>
            </div>
        </div>
    </div>

    <!--  Scripts-->
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="../js/materialize.js"></script>
    <script src="../js/init.js"></script>
    <script type="text/javascript" src = "../js/script.js"></script>
</body>

</html>
