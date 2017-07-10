<?php
session_start();
//get the q parameter from URL
$q=$_GET["q"];

  $hint="";
  include 'connectDB.php';
  $sql = "SELECT * FROM Users WHERE firstName Like '%$q%'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0)
        {
            while($row = mysqli_fetch_assoc($result))
            {
              $hint .= "<li id='".$row['user_id']."'><div class='collapsible-header'><i class='fa fa-user' aria-hidden='true'></i>".$row['firstName']." ".$row['lastName']."</div><div class='collapsible-body' style='padding:10px'><strong>Email:</strong> ".$row['email']." <br><strong>Active Account?:</strong> ".$row['active']." <br><strong>Cellphone Number:</strong> ".$row['cellNumber']." <br><strong>Address:</strong> ".$row['address']." <br><strong>Province:</strong> ".$row['province']." <br><strong>Reference:</strong> ".$row['reference']." <br><strong>Subscription Plan:</strong> ".$row['Plan']." <br><br>";
              
                if ($row['user_id'] != $_SESSION['ID'])
                {
                  $hint .= "<button class='btn waves-effect waves-light deleteAccount3rd' type='submit' name='action' style='margin-bottom:10px; background-color:#D9534F'>Delete Account <i class='fa fa-trash-o' aria-hidden='true'></i></button>";
                }
                
                if ($row['admin'] != 1)
                {
                  $hint .= "<button class='btn waves-effect waves-light makeAdmin' type='submit' name='action' style='margin-bottom:10px; background-color:##5bc0de'>Make Admin <i class='fa fa-lock' aria-hidden='true'></i></button>";
                }
              $hint .= "</div></li>";
            }
        }
        else
        {
            $hint="No users found";
        }
        mysqli_close($conn);

// Set output to "no suggestion" if no hint was found
// or to the correct values
if ($hint=="") {
  $response="";
} else {
  $response=$hint;
}

//output the response
echo $response;
?>