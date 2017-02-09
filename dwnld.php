<?php
session_start();
require_once 'php/include/DB_Connect.php';
# create new zip object
$zip = new ZipArchive();
# create a temp file & open it
$tmp_file = tempnam('.', '');
$zip->open($tmp_file, ZipArchive::CREATE);
$URLs = array();

$sql ="SELECT * FROM Renovations WHERE UserID = " . $_SESSION['ID'] ." ORDER BY ID";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) 
{
    while($row = $result->fetch_assoc()) 
    {
    	$sql ="SELECT * FROM Uploads WHERE ID = " . $row['UploadID'];
		$temp = mysqli_query($conn, $sql);
		$Uploads = $temp->fetch_assoc();
    	$URLs[$Uploads["Name"] . " " . $Uploads['Timestamp']] = "http://www.unhinged.co.za/Demo/Kyle1033/php/RenovationModule/downloadRenovation.php?id=" . $row['ID'];
    }
}

foreach ($URLs as $file => $URL) {
  
  $f = @file_get_contents($URL);
  
  if (empty($f)) throw new Exception("File not found: ".$URL);
  
  $zip->addFromString("Renovations/".$file, $f);
}

# close zip
$zip->close();

# send the file to the browser as a download
header('Content-disposition: attachment; filename="my2Zip.zip"');
header('Content-type: application/zip');
readfile($tmp_file);
unlink($tmp_file);
?>