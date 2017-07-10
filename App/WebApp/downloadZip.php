<?php
require_once 'DB_Connect.php';
# define file array
/*$UserID = 1;
$sql ="SELECT * FROM Uploads WHERE UserID = " . $UserID;
$result = mysqli_query($conn, $sql);

$files = array();
if ($result->num_rows > 0) 
{
    while($row = $result->fetch_assoc()) 
    {
		array_push($files, $row["DocumentName"]);
    }
}*/

# define file array
$fileIDs = explode("-", $_GET["files"]);
$files = array();

for ($i = 0; $i <  sizeof($fileIDs); $i++) { 
	$sql ="SELECT * FROM Uploads WHERE ID = $fileIDs[$i]";
	$result = mysqli_query($conn, $sql);

	if ($result->num_rows > 0) 
	{	
		while($row = $result->fetch_assoc()) 
		{
			array_push($files, $row["DocumentName"]);
		}
	}
}

# create new zip object
$zip = new ZipArchive();

# create a temp file & open it
$zipname = "PI-D22.zip";
$zip->open($zipname, ZipArchive::CREATE);

# loop through each file
foreach ($files as $file) {
	$zip->addFile("./Uploads/" . $file, $file);
}

# close zip
$zip->close();

# send the file to the browser as a download
header('Content-Type: application/zip');
header('Content-disposition: attachment; filename='.$zipname);
header('Content-Length: ' . filesize($zipname));
header("Pragma: no-cache"); 
header("Expires: 0"); 
readfile($zipname);
unlink($zipname);
?>