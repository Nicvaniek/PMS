<?php
    
    require_once 'DB_Connect.php';

    $propertyInformation = json_decode($_POST['propertyInformation']);
    $propertyID = json_decode($_POST['propertyID']);
$UserID = 1;
$propertyID = $propertyInformation->propertyID;
    $StreetName = addslashes($propertyInformation->streetName);
    //echo $streetName;
    $Suburb = (empty($propertyInformation->suburb) ? "" : addslashes($propertyInformation->suburb));
    $Province = (empty($propertyInformation->province) ? "" : addslashes($propertyInformation->province));
    $AreaPostalCode = (empty($propertyInformation->areaPostalCode) ? 0 : $propertyInformation->areaPostalCode);
    $ComplexName = (empty($propertyInformation->complexName) ? "" : addslashes($propertyInformation->complexName));
    $ComplexNumber = (empty($propertyInformation->complexNumber) ? 0 : $propertyInformation->complexNumber);
    $StandSize = (empty($propertyInformation->standSize) ? 0 : $propertyInformation->standSize);
    $CoveredArea = (empty($propertyInformation->standSizeCovered) ? 0 : $propertyInformation->standSizeCovered);
    $UncoveredArea = (empty($propertyInformation->standSizeUncovered) ? 0 : $propertyInformation->standSizeUncovered);
    $PurchaseAmount = (empty($propertyInformation->purchaseAmount) ? 0 : $propertyInformation->purchaseAmount);
    $AuctionCost = (empty($propertyInformation->auctionCost) ? 0 : $propertyInformation->auctionCost);
    $AttorneyFees = (empty($propertyInformation->attorneyFees) ? 0 : $propertyInformation->attorneyFees);
    $TransferDuty = (empty($propertyInformation->transferDuty) ? 0 : $propertyInformation->transferDuty);
    $BankName = (empty($propertyInformation->bankName) ? "" : addslashes($propertyInformation->bankName));
    $AccountNumber = (empty($propertyInformation->accountNumber) ? 0 : addslashes($propertyInformation->accountNumber));
    $DepositAmount = (empty($propertyInformation->depositAmount) ? 0 : $propertyInformation->depositAmount);
    $BondAmount = (empty($propertyInformation->bondAmount) ? 0 : $propertyInformation->bondAmount);
    $Period = (empty($propertyInformation->period) ? 0 : $propertyInformation->period);
    $InterestRate = (empty($propertyInformation->interesetRate) ? 0 : $propertyInformation->interesetRate);
    $MonthlyInstallments = (empty($propertyInformation->monthlyInstallments) ? 0 : $propertyInformation->monthlyInstallments);
    $BondInitiationFee = (empty($propertyInformation->bondInitiationFee) ? 0 : $propertyInformation->bondInitiationFee);
    $PurchaseContractFileID = (empty($propertyInformation->purchaseContractFileID) ? 0 : $propertyInformation->purchaseContractFileID);
    $AuctionFeesFileID = (empty($propertyInformation->auctionFeesFileID) ? 0 : $propertyInformation->auctionFeesFileID);
    $TransferDutyFileID = (empty($propertyInformation->transferDutyFileID) ? 0 : $propertyInformation->transferDutyFileID);
    $AttorneyFeesTransferFileID = (empty($propertyInformation->attorneyFeesTransferFileID) ? 0 : $propertyInformation->attorneyFeesTransferFileID);
    $AttorneyFeesBondApplicationFileID = (empty($propertyInformation->attorneyFeesBondApplicationFileID) ? 0 : $propertyInformation->attorneyFeesBondApplicationFileID);
    $BondConfirmationBankFileID = (empty($propertyInformation->bondConfirmationBankFileID) ? 0 : $propertyInformation->bondConfirmationBankFileID);
    $DepositFileID = (empty($propertyInformation->depositFileID) ? 0 : $propertyInformation->depositFileID);

    $sql ="UPDATE Properties SET UserID = $UserID, StreetName = '$StreetName', Suburb = '$Suburb', Province = '$Province', AreaPostalCode = $AreaPostalCode, ComplexName = '$ComplexName', ComplexNumber = $ComplexNumber, StandSize = $StandSize, CoveredArea = $CoveredArea, UncoveredArea = $UncoveredArea, PurchaseAmount = $PurchaseAmount, AuctionCost = $AuctionCost, AttorneyFees = $AttorneyFees, TransferDuty = $TransferDuty, BankName = '$BankName', AccountNumber = $AccountNumber, DepositAmount = $DepositAmount, BondAmount = $BondAmount, Period = $Period, InterestRate = $InterestRate, MonthlyInstallments = $MonthlyInstallments, BondInitiationFee = $BondInitiationFee, PurchaseContractFileID = $PurchaseContractFileID, AuctionFeesFileID = $AuctionFeesFileID, TransferDutyFileID = $TransferDutyFileID, AttorneyFeesTransferFileID = $AttorneyFeesTransferFileID, AttorneyFeesBondApplicationFileID = $AttorneyFeesBondApplicationFileID, BondConfirmationBankFileID = $BondConfirmationBankFileID, DepositFileID = $DepositFileID WHERE ID = $propertyID";

    echo $sql;

    mysqli_query($conn, $sql);
    echo "success";
?>  