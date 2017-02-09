<?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        include 'connectDB.php';

        // Grab details
        $name = test($_POST['firstName']);
        $surname = test($_POST['lastName']);
        $email = test($_POST['email']);
        $password = testPassword($_POST['password']);
        $refCode = test($_POST['refCode']);
        $active = 0;

        // Check if email already exists in db
        $sql = "SELECT * FROM Users WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0)
            echo "There is already an account with this email address";
        else
        {
            // Hash for verification
            $hash = md5(rand(0,1000));

            // Prepared statements for efficiency and to guard against SQL injections
            $stmt = $conn->prepare("INSERT INTO Users (firstName, lastName, email, password, active, hash) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssis", $name, $surname, $email, $password, $active, $hash);
            $stmt->execute();

            $stmt->close();
            sendActivationEmail($email, $name, $password, $hash);
        }
        mysqli_close($conn);
    }

    // Function to validate input 
    function test($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    function testPassword($data)
    {
        $data = test($data);
        $data = password_hash($data, PASSWORD_DEFAULT);
        return $data;
    }
    function sendActivationEmail($email, $name, $password, $hash)
    {
        $to      = $email; // Send email to our user
        $subject = 'Signup | Verification'; // Give the email a subject 
        $message = '
        
        Dear '.$name.', thanks for signing up!
        Your account has been created, but you will only be able to login once you have verified your account.

        Please click this link to activate your account:
        http://www.unhinged.co.za/Demo/Kyle1031/php/verify.php?email='.$email.'&hash='.$hash.'
         
        '; // Our message above including the link
                             
        $headers = 'From:noreply@yourwebsite.com' . "\r\n"; // Set from headers
        mail($to, $subject, $message, $headers); // Send our email
    }
?>
