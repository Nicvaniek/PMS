<?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        include 'connectDB.php';

        // Grab email
        $email = mysql_escape_string($_POST['email']);

        // Check if email exists in db
        $sql = "SELECT * FROM Users WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) == 0)
            echo "There is no account registered with this email address";
        else
        {
            $row = mysqli_fetch_assoc($result);

            $email = $row['email'];
            $pass = $row['password'];
            $name = $row['firstName'];

            $link="http://www.unhinged.co.za/Demo/php/reset-password.php?key=".md5($email)."&reset=".md5($pass);

            // Send email
            $to      = $email; // Send email to our user
            $subject = 'Password Reset'; // Give the email a subject 
            $message = '
            
            Dear '.$name.', please click on the following link to reset your password:
            '.$link;
                                 
            $headers = 'From:noreply@yourwebsite.com' . "\r\n";
            mail($to, $subject, $message, $headers); // Send our email
        }
        mysqli_close($conn);
    }
?>
