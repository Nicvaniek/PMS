<?php
require('fpdf.php');
require_once '../include/DB_Connect.php';

class PDF extends FPDF
{
	function Header()
	{
		global $title;

		// Arial bold 15
		$this->SetFont('Arial','B',18);
		// Calculate width of title and position
		$w = $this->GetStringWidth($title)+6;
		$this->SetX(7);
		// Colors of frame, background and text
		$this->SetDrawColor(255,255,255);
		$this->SetFillColor(255,255,255);
		$this->SetTextColor(0,0,0);
		// Thickness of frame (1 mm)
		$this->SetLineWidth(0);
		// Title
		$this->Cell($w,9,$title,1,1,'C',true);
		// Line break
		$this->Ln(10);
	}

	function Footer()
	{
		// Position at 1.5 cm from bottom
		$this->SetY(-15);
		// Arial italic 8
		$this->SetFont('Arial','I',8);
		// Text color in gray
		$this->SetTextColor(128);
		// Page number
		$this->Cell(0,10,'Page '.$this->PageNo(),0,0,'C');
	}
	// Load data
	function LoadData($file)
	{
		// Read file lines
		$lines = file($file);
		$data = array();
		foreach($lines as $line)
			$data[] = explode(';',trim($line));
		return $data;
	}
	// Colored table
	function FancyTable($header, $data)
	{
		// Colors, line width and bold font
		$this->SetFillColor(255,0,0);
		$this->SetTextColor(255);
		$this->SetDrawColor(128,0,0);
		$this->SetLineWidth(.3);
		$this->SetFont('','B');
		// Header
		$w = array(40, 35, 45, 45, 30, 30, 30);
		for($i=0;$i<count($header);$i++)
			$this->Cell($w[$i],7,$header[$i],1,0,'C',true);
		$this->Ln();
		// Color and font restoration
		$this->SetFillColor(224,235,255);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = false;
		foreach($data as $row)
		{
			$this->Cell($w[0],6,$row[0],'LR',0,'L',$fill);
			$this->Cell($w[1],6,$row[1],'LR',0,'L',$fill);
			$this->Cell($w[2],6,$row[2],'LR',0,'R',$fill);
			$this->Cell($w[3],6,$row[3],'LR',0,'R',$fill);
			$this->Cell($w[4],6,$row[4],'LR',0,'R',$fill);
			$this->Cell($w[5],6,$row[5],'LR',0,'R',$fill);
			$this->Cell($w[6],6,$row[6],'LR',0,'R',$fill);
			$this->Ln();
			$fill = !$fill;
		}
		// Closing line
		$this->Cell(array_sum($w),0,'','T');
	}
}
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$filename = generateRandomString();

$myfile = fopen($filename, "w");
$sql ="SELECT * FROM Renovations WHERE PropertyID = 1 AND UserID = 1 ORDER BY ID";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) 
{
    while($row = $result->fetch_assoc()) 
    {
    	fwrite($myfile, $row['Name'] . ";");
	    fwrite($myfile, $row['Supplier'] . ";");

	    if($row['UploadID'] > 0)
	    {
	    	$txt = "Yes;";
	    	fwrite($myfile, $txt);
	    	fwrite($myfile, $row['InvoiceDate'].";");
	    }
	    else
	    {
	    	$txt = "No;";
	    	fwrite($myfile, $txt);
	    	$txt = "--/--/----;";
	    	fwrite($myfile, $txt);
	    }

	    $txt = "R " . $row['Cost']. ";";
	    fwrite($myfile, $txt);
	    fwrite($myfile, $row['Quantity']. ";");
	    $total = $row['Cost'] * $row['Quantity'];
	    fwrite($myfile, $total . "\n");
    }
}
fclose($myfile);

$pdf = new PDF('L','mm','A4');
$title = 'Renovations Table';
$pdf->SetTitle($title);
// Column headings
$header = array('Description','Supplier','Invoice Attached','Invoice Date','Amount', 'Quantity', 'Total');
// Data loading
$data = $pdf->LoadData($filename);
$pdf->SetFont('Arial','',14);
$pdf->AddPage();
$pdf->FancyTable($header,$data);
$pdf->Output();

unlink($filename);

?>
