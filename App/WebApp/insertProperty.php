<?php
    
    require_once 'DB_Connect.php';

    $propertyInformation = json_decode($_POST['propertyInformation']);
    //echo $propertyInformation->streetName;


    $UserID = 1;
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

    $sql ="INSERT INTO Properties (UserID, StreetName, Suburb, Province, AreaPostalCode, ComplexName, ComplexNumber, StandSize, CoveredArea, UncoveredArea, PurchaseAmount, AuctionCost, AttorneyFees, TransferDuty, BankName, AccountNumber, DepositAmount, BondAmount, Period, InterestRate, MonthlyInstallments, BondInitiationFee, PurchaseContractFileID, AuctionFeesFileID, TransferDutyFileID, AttorneyFeesTransferFileID, AttorneyFeesBondApplicationFileID, BondConfirmationBankFileID, DepositFileID) VALUES ( 1, '$StreetName', '$Suburb', '$Province', $AreaPostalCode, '$ComplexName', $ComplexNumber, $StandSize, $CoveredArea, $UncoveredArea, $PurchaseAmount, $AuctionCost, $AttorneyFees, $TransferDuty, '$BankName', $AccountNumber, $DepositAmount, $BondAmount, $Period, $InterestRate, $MonthlyInstallments, $BondInitiationFee, $PurchaseContractFileID, $AuctionFeesFileID, $TransferDutyFileID, $AttorneyFeesTransferFileID, $AttorneyFeesBondApplicationFileID, $BondConfirmationBankFileID, $DepositFileID)";

    mysqli_query($conn, $sql);

    $sql ="SELECT * FROM Properties WHERE UserID = 1 AND StreetName = '$StreetName' AND Suburb = '$Suburb' AND Province = '$Province' AND AreaPostalCode = $AreaPostalCode AND ComplexNumber = $ComplexNumber";

    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) 
    {
        while($row = $result->fetch_assoc()) 
        {
            echo $row["ID"];
        }
    }


?>  