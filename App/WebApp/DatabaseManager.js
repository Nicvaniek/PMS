function DatabaseManager() {}

//////////////////////////////////////////////////////////
/// General
//////////////////////////////////////////////////////////
DatabaseManager.prototype.uploadFile = function(file) {
    var uploadId = null;

    var form = new FormData();
    form.append('fileToUpload', file);

    $.ajax({
        type: "POST",
        url: 'uploadFile.php',
        data: form,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        failure: function() {

        },
        success: function(response) {
            uploadId = response;
        }
    });

    return uploadId;
}

DatabaseManager.prototype.downloadZip = function(fileIDs) {
    var downloadZipUrl = "downloadZip.php?files=";

    for (var i = fileIDs.length - 1; i >= 0; i--) {
        if (fileIDs[i] != 0) {
            if (i != 0) {
                downloadZipUrl += fileIDs[i] + "-";
            } else {
                downloadZipUrl += fileIDs[i] + "";
            }
        }
    }

    alert(downloadZipUrl);

    window.open(downloadZipUrl, '_blank');
}

//////////////////////////////////////////////////////////
/// Properties
//////////////////////////////////////////////////////////
DatabaseManager.prototype.getProperties = function() {
    var array = null;

    var form = new FormData();
    form.append("userID", 1);

    $.ajax({
        type: "POST",
        url: './initialiseProperty.php',
        data: form,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        failure: function() {

        },
        success: function(response) {
            response = JSON.parse(response);
            array = response;

        }
    });

    return array;
}

DatabaseManager.prototype.initialiseProperty = function() {

    var dbResults = this.getProperties();
    var propertyInformation = [];

    dbResults.forEach(function(property) {
        propertyInformation.push({
            "streetName": property["StreetName"],
            "suburb": property["Suburb"],
            "province": property["Province"],
            "areaPostalCode": property["AreaPostalCode"],
            "complexName": property["ComplexName"],
            "complexNumber": property["ComplexNumber"],
            "standSize": property["StandSize"],
            "standSizeCovered": property["CoveredArea"],
            "standSizeUncovered": property["UncoveredArea"],
            "purchaseAmount": property["PurchaseAmount"],
            "auctionCost": property["AuctionCost"],
            "attorneyFees": property["AttorneyFees"],
            "attorneyFeesUploadID": property["AttorneyFeesUploadID"],
            "transferDuty": property["TransferDuty"],
            "transferDutyUploadID": property["TransferDutyUploadID"],
            "bankName": property["BankName"],
            "accountNumber": property["AccountNumber"],
            "depositAmount": property["DepositAmount"],
            "bondAmount": property["BondAmount"],
            "bondRegistrationUploadID": property["BondRegistrationUploadID"],
            "period": property["Period"],
            "interesetRate": property["InteresetRate"],
            "monthlyInstallments": property["MonthlyInstallments"],
            "bondInitiationFee": property["BondInitiationFee"],
        });
    });
    return propertyInformation;
}

DatabaseManager.prototype.insertPropertyAndGetID = function(propertyInformation) {
    var propertyID = null;

    var form = new FormData();
    form.append("propertyInformation", JSON.stringify(propertyInformation));
    $.ajax({
        type: "POST",
        url: './insertProperty.php',
        data: form,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        failure: function() {

        },
        success: function(response) {
            propertyID = response;
        }
    });

    return propertyID;
}

DatabaseManager.prototype.deleteProperty = function(propertyID) {
    var form = new FormData();
    form.append("propertyID", propertyID);
    $.ajax({
        type: "POST",
        url: './deleteProperty.php',
        data: form,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        failure: function() {

        },
        success: function(response) {
            console.log(response);
        }
    });
}

DatabaseManager.prototype.updateProperty = function(propertyInformation, propertyID) {
    var form = new FormData();
    form.append("propertyInformation", JSON.stringify(propertyInformation));
    form.append("propertyID", propertyID);
    $.ajax({
        type: "POST",
        url: './updateProperty.php',
        data: form,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        failure: function() {

        },
        success: function(response) {
            console.log(response);
        }
    });
}
