<?php
session_start();
require_once 'include/DB_Connect.php';
# create new zip object
$zip = new ZipArchive();
# create a temp file & open it
$tmp_file = tempnam('.', '');
$zip->open($tmp_file, ZipArchive::CREATE);
$URLs = array();

$sql ="SELECT * FROM Properties WHERE UserID = " . $_SESSION['ID'];
$propertyTable = mysqli_query($conn, $sql);
if ($propertyTable->num_rows > 0) 
{
    while($property = $propertyTable->fetch_assoc()) 
    {
        if ($_GET['propertyID'] == $property['ID'] || $_GET['propertyID'] == 'all') 
        {
            if ($_GET['type'] == 'renovations' || $_GET['type'] == 'all') 
            {
                $sql ="SELECT * FROM Renovations WHERE UserID = " . $_SESSION['ID'] ." AND ". $property['ID'];
                $result = mysqli_query($conn, $sql);

                if ($result->num_rows > 0) 
                {
                    while($row = $result->fetch_assoc()) 
                    {
                        $sql ="SELECT * FROM Uploads WHERE ID = " . $row['UploadID'];
                        $temp = mysqli_query($conn, $sql);
                        $Uploads = $temp->fetch_assoc();
                        $URLs[$Uploads["Name"] . " " . $Uploads['Timestamp']] = "http://www.unhinged.co.za/Demo/php/RenovationModule/downloadRenovation.php?id=" . $row['ID'];
                    }
                }
                foreach ($URLs as $file => $URL) {
                  
                    $f = @file_get_contents($URL);

                    if (empty($f)) throw new Exception("File not found: ".$URL);

                    $zip->addFromString($property['Name'] . "/" . "Renovations/".$file, $f);
                }
            }
            if ($_GET['type'] == 'expenses' || $_GET['type'] == 'all') 
            {
                $sql ="SELECT * FROM Expenses WHERE UserID = " . $_SESSION['ID'] ." AND ". $property['ID'];
                $result = mysqli_query($conn, $sql);

                if ($result->num_rows > 0) 
                {
                    while($row = $result->fetch_assoc()) 
                    {
                        $sql ="SELECT * FROM Uploads WHERE ID = " . $row['UploadID'];
                        $temp = mysqli_query($conn, $sql);
                        $Uploads = $temp->fetch_assoc();
                        $URLs[$Uploads["Name"] . " " . $Uploads['Timestamp']] = "http://www.unhinged.co.za/Demo/php/RenovationModule/downloadRenovation.php?id=" . $row['ID'];
                    }
                }
                foreach ($URLs as $file => $URL) {
                  
                    $f = @file_get_contents($URL);

                    if (empty($f)) throw new Exception("File not found: ".$URL);

                    $zip->addFromString($property['Name'] . "/" . "Expenses/".$file, $f);
                }
            }
        }
    }
}
            
# close zip
$zip->close();

# send the file to the browser as a download
header('Content-disposition: attachment; filename="myZip.zip"');
header('Content-type: application/zip');
readfile($tmp_file);
unlink($tmp_file);
?>