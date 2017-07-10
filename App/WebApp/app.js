var app = angular.module("propertyInvestor", []);

app.controller("propertyController", ["$scope", function($scope) {
    ////////////////////////////////////////////////////////////////////////
    // Variables
    ////////////////////////////////////////////////////////////////////////

    $scope.databaseManager = new DatabaseManager();

    // Property 
    $scope.propertyDetails = [];
    $scope.numberOfproperties = 0;

    $scope.addPropertyForm = false;
    $scope.viewProperty = false;
    $scope.editProperty = false;

    $scope.selectedProperty = -1;

    $scope.propertyGraphManager = new GraphManager("propertyDoughnutGraph", "propertyBarChart");

    // Expense
    $scope.expenseDetails = [];
    $scope.expenseGroups = [];

    $scope.expenseAddQueue = [];

    $scope.showAddExpense = false;
    $scope.showEditExpense = false;

    $scope.selectedExpense = -1;

    $scope.expenseGraphManager = new GraphManager("expenseDoughnutGraph", "expenseBarChart");

    // Renovation
    $scope.renovationDetails = [];
    $scope.renovationGroups = [];

    $scope.renovationAddQueue = [];

    $scope.showAddRenovation = false;
    $scope.showEditRenovation = false;

    $scope.selectedRenovation = -1;

    $scope.renovationGraphManager = new GraphManager("renovationDoughnutGraph", "renovationBarChart");

    // Sales
    $scope.saleDetails = [];

    $scope.saleAddQueue = [];

    $scope.showAddSale = false;
    $scope.showEditSale = false;

    $scope.selectedSale = -1;

    $scope.recordSale = [];

    // SaleAgents
    $scope.saleAgentDetails = [];

    $scope.showAddSaleAgent = false;
    $scope.showEditSaleAgent = false;

    $scope.selectedSaleAgent = -1;
    $scope.saleAgentGraphManager = new CustomGraphManager("saleAgentDoughnutGraph", "saleAgentBarChart");

    // Rent
    $scope.rentDetails = [];

    $scope.showAddRent = false;
    $scope.showEditRent = false;

    $scope.selectedRent = -1;

    // Tentants
    $scope.tentantDetails = [];

    $scope.showAddTentant = false;
    $scope.showEditTentant = false;

    $scope.selectedTentant = -1;

    // Details 
    $scope.numberOfpropertiesCAP = 2;
    ////////////////////////////////////////////////////////////////////////
    // Properties
    ////////////////////////////////////////////////////////////////////////

    $scope.addNewProperty = function(propertyDetails) {
        if ($scope.numberOfproperties == $scope.numberOfpropertiesCAP) {
            swal({
                title: "Limit Reached",
                text: "You've reached your maximum number of properties. You can add more properties by upgrading your account",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });
            $scope.addPropertyForm = false;
            return;
        }

        // Upload files and get the IDs
        var purchaseContractFileID = 0;
        var auctionFeesFileID = 0;
        var transferDutyFileID = 0;
        var attorneyFeesTransferFileID = 0;
        var attorneyFeesBondApplicationFileID = 0;
        var bondConfirmationBankFileID = 0;
        var depositFileID = 0;

        if ($("#inputPropertyPurchaseContractFile").val() != "") {
            purchaseContractFileID = $scope.databaseManager.uploadFile($("#inputPropertyPurchaseContractFile").prop('files')[0]);
        }
        if ($("#inputPropertyAuctionFeesFile").val() != "") {
            auctionFeesFileID = $scope.databaseManager.uploadFile($("#inputPropertyAuctionFeesFile").prop('files')[0]);
        }
        if ($("#inputPropertyTransferDutyFile").val() != "") {
            transferDutyFileID = $scope.databaseManager.uploadFile($("#inputPropertyTransferDutyFile").prop('files')[0]);
        }
        if ($("#inputPropertyAttorneyFeesTransferFile").val() != "") {
            attorneyFeesTransferFileID = $scope.databaseManager.uploadFile($("#inputPropertyAttorneyFeesTransferFile").prop('files')[0]);
        }
        if ($("#inputPropertyAttorneyFeesBondApplicationFile").val() != "") {
            attorneyFeesBondApplicationFileID = $scope.databaseManager.uploadFile($("#inputPropertyAttorneyFeesBondApplicationFile").prop('files')[0]);
        }
        if ($("#inputPropertyBondConfirmationBankFile").val() != "") {
            bondConfirmationBankFileID = $scope.databaseManager.uploadFile($("#inputPropertyBondConfirmationBankFile").prop('files')[0]);
        }
        if ($("#inputPropertyDepositFile").val() != "") {
            depositFileID = $scope.databaseManager.uploadFile($("#inputPropertyDepositFile").prop('files')[0]);
        }

        // Push to local array 
        $scope.propertyDetails.push({
            "propertyID": -1,
            "streetName": $("#inputPropertyStreetName").val(),
            "suburb": $("#inputPropertySuburb").val(),
            "province": $("#inputPropertyProvince").val(),
            "areaPostalCode": $("#inputPropertyAreaPostalCode").val(),
            "complexName": $("#inputPropertyComplexName").val(),
            "complexNumber": $("#inputPropertyComplexNumber").val(),
            "standSize": $("#inputPropertyStandSize").val(),
            "standSizeCovered": $("#inputPropertyStandSizeCovered").val(),
            "standSizeUncovered": $("#inputPropertyStandSizeUncovered").val(),
            "purchaseAmount": $("#inputPropertyPurchaseAmount").val(),
            "auctionCost": $("#inputPropertyAuctionCost").val(),
            "attorneysFees": $("#inputPropertyAttorneysFees").val(),
            "transferDuty": $("#inputPropertyTransferDuty").val(),
            "bankName": $("#inputPropertyBankName").val(),
            "accountNumber": $("#inputPropertyAccountNumber").val(),
            "depositAmount": $("#inputPropertyDepositAmount").val(),
            "bondAmount": $("#inputPropertyBondAmount").val(),
            "period": $("#inputPropertyPeriod").val(),
            "interesetRate": $("#inputPropertyInteresetRate").val(),
            "monthlyInstallments": $("#inputPropertyMonthlyInstallments").val(),
            "bondInitiationFee": $("#inputPropertyBondInitiationFee").val(),
            "bondRegistration": $("#inputPropertyBondRegistration").val(),
            "purchaseContractFileID": purchaseContractFileID,
            "auctionFeesFileID": auctionFeesFileID,
            "transferDutyFileID": transferDutyFileID,
            "attorneyFeesTransferFileID": attorneyFeesTransferFileID,
            "attorneyFeesBondApplicationFileID": attorneyFeesBondApplicationFileID,
            "bondConfirmationBankFileID": bondConfirmationBankFileID,
            "depositFileID": depositFileID
        });
        $scope.PD = {};

        // Push to database and get the ID
        var propertyID = $scope.databaseManager.insertPropertyAndGetID($scope.propertyDetails[$scope.numberOfproperties]);
        $scope.propertyDetails[$scope.numberOfproperties]["propertyID"] = propertyID;

        // Update counter
        $scope.numberOfproperties = $scope.numberOfproperties + 1;

        // Just update the side bar
        if ($scope.numberOfproperties == 1) {
            $("#numberOfpropertiesNavBar").text($scope.numberOfproperties + " Property");

        } else {
            $("#numberOfpropertiesNavBar").text($scope.numberOfproperties + " Properties");
        }
        $scope.addPropertyForm = false;
        swal("Great work!", "You have added a property!", "success")
    };

    $scope.selectPropertyToEdit = function() {
        $scope.editProperty = true;
        $scope.viewProperty = false;

        angular.forEach($scope.propertyDetails, function(selected) {
            if (selected.propertyID == $scope.selectedProperty) {
                $("#inputPropertyStreetName").val(selected.streetName);
                $("#inputPropertySuburb").val(selected.suburb);
                $("#inputPropertyProvince").val(selected.province);
                $("#inputPropertyAreaPostalCode").val(selected.areaPostalCode);
                $("#inputPropertyComplexName").val(selected.complexName);
                $("#inputPropertyComplexNumber").val(selected.complexNumber);
                $("#inputPropertyStandSize").val(selected.standSize);
                $("#inputPropertyStandSizeCovered").val(selected.standSizeCovered);
                $("#inputPropertyStandSizeUncovered").val(selected.standSizeUncovered);
                $("#inputPropertyPurchaseAmount").val(selected.purchaseAmount);
                $("#inputPropertyAuctionCost").val(selected.auctionCost);
                $("#inputPropertyAttorneysFees").val(selected.attorneysFees);
                $("#inputPropertyTransferDuty").val(selected.transferDuty);
                $("#inputPropertyBankName").val(selected.bankName);
                $("#inputPropertyAccountNumber").val(selected.accountNumber);
                $("#inputPropertyDepositAmount").val(selected.depositAmount);
                $("#inputPropertyBondAmount").val(selected.bondAmount);
                $("#inputPropertyPeriod").val(selected.period);
                $("#inputPropertyInteresetRate").val(selected.interesetRate);
                $("#inputPropertyMonthlyInstallments").val(selected.monthlyInstallments);
                $("#inputPropertyBondInitiationFee").val(selected.bondInitiationFee);
                $("#inputPropertyBondRegistration").val(selected.bondRegistration);
            }
        });
    }

    $scope.editPropertyConfirm = function(propertyDetails) {
        alert("JOH");

        var count = 0;

        angular.forEach($scope.propertyDetails, function(selected) {
            alert(selected.propertyID + " == " + $scope.selectedProperty);
            if (selected.propertyID == $scope.selectedProperty) {
        alert("JOH");

                // Upload files and get the IDs
                var purchaseContractFileID = 0;
                var auctionFeesFileID = 0;
                var transferDutyFileID = 0;
                var attorneyFeesTransferFileID = 0;
                var attorneyFeesBondApplicationFileID = 0;
                var bondConfirmationBankFileID = 0;
                var depositFileID = 0;

                if ($("#inputPropertyPurchaseContractFile").val() != "" && $("#inputPropertyPurchaseContractFile").val() != "Uploaded") {
                    purchaseContractFileID = $scope.databaseManager.uploadFile($("#inputPropertyPurchaseContractFile").prop('files')[0]);
                }
                if ($("#inputPropertyAuctionFeesFile").val() != "" && $("#inputPropertyAuctionFeesFile").val() != "Uploaded") {
                    auctionFeesFileID = $scope.databaseManager.uploadFile($("#inputPropertyAuctionFeesFile").prop('files')[0]);
                }
                if ($("#inputPropertyTransferDutyFile").val() != "" && $("#inputPropertyTransferDutyFile").val() != "Uploaded") {
                    transferDutyFileID = $scope.databaseManager.uploadFile($("#inputPropertyTransferDutyFile").prop('files')[0]);
                }
                if ($("#inputPropertyAttorneyFeesTransferFile").val() != "" && $("#inputPropertyAttorneyFeesTransferFile").val() != "Uploaded") {
                    attorneyFeesTransferFileID = $scope.databaseManager.uploadFile($("#inputPropertyAttorneyFeesTransferFile").prop('files')[0]);
                }
                if ($("#inputPropertyAttorneyFeesBondApplicationFile").val() != "" && $("#inputPropertyAttorneyFeesBondApplicationFile").val() != "Uploaded") {
                    attorneyFeesBondApplicationFileID = $scope.databaseManager.uploadFile($("#inputPropertyAttorneyFeesBondApplicationFile").prop('files')[0]);
                }
                if ($("#inputPropertyBondConfirmationBankFile").val() != "" && $("#inputPropertyBondConfirmationBankFile").val() != "Uploaded") {
                    bondConfirmationBankFileID = $scope.databaseManager.uploadFile($("#inputPropertyBondConfirmationBankFile").prop('files')[0]);
                }
                if ($("#inputPropertyDepositFile").val() != "" && $("#inputPropertyDepositFile").val() != "Uploaded") {
                    depositFileID = $scope.databaseManager.uploadFile($("#inputPropertyDepositFile").prop('files')[0]);
                }
                $scope.propertyDetails[count]["streetName"] = $("#inputPropertyStreetName").val();
                $scope.propertyDetails[count]["suburb"] = $("#inputPropertySuburb").val();
                $scope.propertyDetails[count]["province"] = $("#inputPropertyProvince").val();
                $scope.propertyDetails[count]["areaPostalCode"] = $("#inputPropertyAreaPostalCode").val();
                $scope.propertyDetails[count]["complexName"] = $("#inputPropertyComplexName").val();
                $scope.propertyDetails[count]["complexNumber"] = $("#inputPropertyComplexNumber").val();
                $scope.propertyDetails[count]["standSize"] = $("#inputPropertyStandSize").val();
                $scope.propertyDetails[count]["standSizeCovered"] = $("#inputPropertyStandSizeCovered").val();
                $scope.propertyDetails[count]["standSizeUncovered"] = $("#inputPropertyStandSizeUncovered").val();
                $scope.propertyDetails[count]["purchaseAmount"] = $("#inputPropertyPurchaseAmount").val();
                $scope.propertyDetails[count]["auctionCost"] = $("#inputPropertyAuctionCost").val();
                $scope.propertyDetails[count]["attorneysFees"] = $("#inputPropertyAttorneysFees").val();
                $scope.propertyDetails[count]["transferDuty"] = $("#inputPropertyTransferDuty").val();
                $scope.propertyDetails[count]["bankName"] = $("#inputPropertyBankName").val();
                $scope.propertyDetails[count]["accountNumber"] = $("#inputPropertyAccountNumber").val();
                $scope.propertyDetails[count]["depositAmount"] = $("#inputPropertyDepositAmount").val();
                $scope.propertyDetails[count]["bondAmount"] = $("#inputPropertyBondAmount").val();
                $scope.propertyDetails[count]["period"] = $("#inputPropertyPeriod").val();
                $scope.propertyDetails[count]["interesetRate"] = $("#inputPropertyInteresetRate").val();
                $scope.propertyDetails[count]["monthlyInstallments"] = $("#inputPropertyMonthlyInstallments").val();
                $scope.propertyDetails[count]["bondInitiationFee"] = $("#inputPropertyBondInitiationFee").val();
                $scope.propertyDetails[count]["bondRegistration"] = $("#inputPropertyBondRegistration").val();
                $scope.propertyDetails[count]["purchaseContractFileID"] = purchaseContractFileID;
                $scope.propertyDetails[count]["auctionFeesFileID"] = auctionFeesFileID;
                $scope.propertyDetails[count]["transferDutyFileID"] = transferDutyFileID;
                $scope.propertyDetails[count]["attorneyFeesTransferFileID"] = attorneyFeesTransferFileID;
                $scope.propertyDetails[count]["attorneyFeesBondApplicationFileID"] = attorneyFeesBondApplicationFileID;
                $scope.propertyDetails[count]["bondConfirmationBankFileID"] = bondConfirmationBankFileID;
                $scope.propertyDetails[count]["depositFileID"] = depositFileID;

                 $scope.databaseManager.updateProperty($scope.propertyDetails[count]);
            }
            count++;
        });

        $scope.editProperty = false;
        $scope.viewProperty = true;

        $("#inputPropertyStreetName").val("");
        $("#inputPropertySuburb").val("");
        $("#inputPropertyProvince").val("");
        $("#inputPropertyAreaPostalCode").val("");
        $("#inputPropertyComplexName").val("");
        $("#inputPropertyComplexNumber").val("");
        $("#inputPropertyStandSize").val("");
        $("#inputPropertyStandSizeCovered").val("");
        $("#inputPropertyStandSizeUncovered").val("");
        $("#inputPropertyPurchaseAmount").val("");
        $("#inputPropertyAuctionCost").val("");
        $("#inputPropertyAttorneysFees").val("");
        $("#inputPropertyTransferDuty").val("");
        $("#inputPropertyBankName").val("");
        $("#inputPropertyAccountNumber").val("");
        $("#inputPropertyDepositAmount").val("");
        $("#inputPropertyBondAmount").val("");
        $("#inputPropertyPeriod").val("");
        $("#inputPropertyInteresetRate").val("");
        $("#inputPropertyMonthlyInstallments").val("");
        $("#inputPropertyBondInitiationFee").val("");
        $("#inputPropertyBondRegistration").val("");
        $("#inputPropertyPurchaseContractFile").val("");
        $("#inputPropertyAuctionFeesFile").val("");
        $("#inputPropertyTransferDutyFile").val("");
        $("#inputPropertyAttorneyFeesTransferFile").val("");
        $("#inputPropertyAttorneyFeesBondApplicationFile").val("");
        $("#inputPropertyBondConfirmationBankFile").val("");
        $("#inputPropertyDepositFile").val("");
    }

    $scope.delete = function() {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this property!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function() {
                var newDataList = [];
                $scope.selectedAll = false;

                angular.forEach($scope.propertyDetails, function(selected) {
                    if (selected.propertyID != $scope.selectedProperty) {
                        newDataList.push(selected);
                    }
                });
                $scope.propertyDetails = newDataList;
                swal("Deleted!", "Your property has been deleted.", "success");
            });
    };

    $scope.downloadProperty = function() {
        var count = 0;
        angular.forEach($scope.propertyDetails, function(selected) {
            alert(selected.propertyID + " == " + $scope.selectedProperty);

            if (selected.propertyID == $scope.selectedProperty) {
                var fileIDs = [];
                fileIDs.push($scope.propertyDetails[count]["purchaseContractFileID"]);
                fileIDs.push($scope.propertyDetails[count]["auctionFeesFileID"]);
                fileIDs.push($scope.propertyDetails[count]["transferDutyFileID"]);
                fileIDs.push($scope.propertyDetails[count]["attorneyFeesTransferFileID"]);
                fileIDs.push($scope.propertyDetails[count]["attorneyFeesBondApplicationFileID"]);
                fileIDs.push($scope.propertyDetails[count]["bondConfirmationBankFileID"]);
                fileIDs.push($scope.propertyDetails[count]["depositFileID"]);
                alert(fileIDs);
                $scope.databaseManager.downloadZip(fileIDs);
                return;
            }
            count++;
        });
    };

    $scope.toggleAddProprty = function() {
        $('ul.tabs').tabs('select_tab', 'propertyInformationTab');
        $scope.addPropertyForm = true;
    };

    $scope.toggleEditProprty = function() {
        $scope.editProperty = !$scope.editProperty;
        $scope.viewProperty = !$scope.viewProperty;
    };

    $scope.toggleViewProperty = function() {
        $scope.viewProperty = !$scope.viewProperty;
    };

    $scope.selectPropertyToView = function(selectedProperty) {
        if ($scope.addPropertyForm) {
            $scope.addPropertyForm = false;
        }

        $scope.selectedProperty = selectedProperty;
        $scope.toggleViewProperty();
    };

    $scope.reloadPropertyGraph = function() {
        // Add Expenses
        var propertyGraphMoney = [];
        angular.forEach($scope.expenseDetails, function(expense) {
            propertyGraphMoney.push({
                "description": "Money Spent",
                "cost": expense.cost,
                "quantity": expense.quantity,
                "invoiceDate": expense.invoiceDate
            });
        });

        // Add Renovations
        angular.forEach($scope.renovationDetails, function(renovation) {
            propertyGraphMoney.push({
                "description": "Money Spent",
                "cost": renovation.cost,
                "quantity": renovation.quantity,
                "invoiceDate": renovation.invoiceDate
            });
        });

        // Add rent income
        angular.forEach($scope.rentDetails, function(rent) {
            propertyGraphMoney.push({
                "description": "Income",
                "cost": rent.proofOfPaymentAmount,
                "quantity": 1,
                "invoiceDate": rent.proofOfPaymentDate
            });
        });

        $scope.propertyGraphManager.update(propertyGraphMoney);
    };

    ////////////////////////////////////////////////////////////////////////
    // Expenes
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewExpense = function(expenseDetails) {
        $scope.expenseDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": $("#inputExpenseDescription").val(),
            "cost": expenseDetails.cost,
            "quantity": expenseDetails.quantity,
            "paidTo": expenseDetails.paidTo,
            "invoiceNumber": expenseDetails.invoiceNumber,
            "invoiceDate": $('#inputExpenseInvoiceDate').val()
        });

        $scope.reloadPropertyGraph();
        $scope.expenseGraphManager.update($scope.expenseDetails);

        $scope.PD = {};
        swal("Great work!", "You have added an expense for this property!", "success");

        if ($scope.expenseAddQueue.length != 0) {
            $scope.nextExpenseFromQueue();
            $("#inputExpenseCost").val("");

        } else {
            $("#inputExpenseDescription").val("");
            $("#inputExpensePaidTo").val("");
            $("#inputExpenseInvoiceNumber").val("");
            $("#inputExpenseInvoiceDate").val("");
            $("#inputExpenseCost").val("");
            $("#inputExpenseQuantity").val("");
            $scope.showAddExpense = false;
        }

    };

    $scope.deleteExpense = function() {

        var expenseToDelete = "";
        angular.forEach($scope.expenseDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                expenseToDelete = selected;
            }
        });

        if (expenseToDelete != "") {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this expense!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function() {
                    var newDataList = [];

                    $scope.selectedAll = false;

                    angular.forEach($scope.expenseDetails, function(selected) {
                        if (selected != expenseToDelete) {

                            newDataList.push(selected);
                        }
                    });
                    $scope.expenseDetails = newDataList;
                    $scope.$apply();
                    swal("Deleted!", "Your expense has been deleted.", "success");
                    $scope.expenseGraphManager.update($scope.expenseDetails);
                    $scope.reloadPropertyGraph();
                });
        } else {
            swal({
                title: "Error",
                text: "Please select an expense to delete.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });
        }
    };
    // @EditExpnse 
    $scope.editExpense = function() {
        var newDataList = [];

        // Delete the expense
        angular.forEach($scope.expenseDetails, function(selected) {
            if (selected != $scope.selectedExpense) {

                newDataList.push(selected);
            }
        });
        $scope.expenseDetails = newDataList;

        // Add the new version
        $scope.expenseDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": $("#inputExpenseDescription").val(),
            "cost": $("#inputExpenseCost").val(),
            "quantity": $("#inputExpenseQuantity").val(),
            "paidTo": $("#inputExpensePaidTo").val(),
            "invoiceNumber": $("#inputExpenseInvoiceNumber").val(),
            "invoiceDate": $('#inputExpenseInvoiceDate').val()
        });
        $scope.PD = {};
        $scope.expenseGraphManager.update($scope.expenseDetails);
        $scope.reloadPropertyGraph();

        swal("Great work!", "You have edited this expense!", "success");
        $scope.showEditExpense = false;
        $scope.showAddExpense = false;

        $("#inputExpenseDescription").val("");
        $("#inputExpensePaidTo").val("");
        $("#inputExpenseInvoiceNumber").val("");
        $("#inputExpenseInvoiceDate").val("");
        $("#inputExpenseCost").val("");
        $("#inputExpenseQuantity").val("");
    }

    $scope.selectExpenseToEdit = function() {
        var expenseToEdit = "";
        angular.forEach($scope.expenseDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                expenseToEdit = selected;
            }
        });
        if (expenseToEdit != "") {
            $scope.selectedExpense = expenseToEdit;

            $("#inputExpenseDescription").val($scope.selectedExpense.description);
            $("#inputExpensePaidTo").val($scope.selectedExpense.paidTo);
            $("#inputExpenseInvoiceNumber").val($scope.selectedExpense.invoiceNumber);
            $("#inputExpenseInvoiceDate").val($scope.selectedExpense.invoiceDate);
            $("#inputExpenseCost").val($scope.selectedExpense.cost);
            $("#inputExpenseQuantity").val($scope.selectedExpense.quantity);
            $scope.showAddExpense = false;
            $scope.showEditExpense = true;

            Materialize.updateTextFields();

        } else {
            swal({
                title: "Error",
                text: "Please select an expense to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });
        }
    };

    $scope.repeatExpense = function() {
        var expenseToRepeat = "";
        angular.forEach($scope.expenseDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                expenseToRepeat = selected;
            }
        });

        if (expenseToRepeat != "") {
            $scope.selectedExpense = expenseToRepeat;

            swal({
                    title: "Notice",
                    text: "Do you want to upload an invoice?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "No",
                    cancelButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $scope.expenseDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedExpense.groupName,
                            "description": $scope.selectedExpense.description,
                            "cost": $scope.selectedExpense.cost,
                            "quantity": $scope.selectedExpense.quantity,
                            "paidTo": $scope.selectedExpense.paidTo,
                            "invoiceDate": "",

                        });
                        $scope.PD = {};
                        $scope.$apply();
                        swal("Great work!", "This expense has been tracked", "success")

                    } else {
                        $scope.expenseDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedExpense.groupName,
                            "description": $scope.selectedExpense.description,
                            "cost": $scope.selectedExpense.cost,
                            "quantity": $scope.selectedExpense.quantity,
                            "paidTo": $scope.selectedExpense.paidTo,
                            "invoiceDate": $scope.selectedExpense.invoiceDate,

                        });
                        $scope.PD = {};
                        $scope.$apply();

                        swal("Great work!", "Todo Fix", "success")
                    }
                });

        } else {
            swal({
                title: "Error",
                text: "Please select an expense to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.getTotalExpenseCost = function(groupName) {
        var total = 0;

        if (groupName == "") {
            angular.forEach($scope.expenseDetails, function(selected) {
                total += selected.cost * selected.quantity;
            });


        } else {
            angular.forEach($scope.expenseDetails, function(selected) {
                if (selected.groupName == groupName) {
                    total += selected.cost * selected.quantity;
                }

            });
        }

        return total;
    };

    $scope.insertQuickExpenses = function() {

        for (var i = 1; i <= 7; i++) {
            if ($("#expenseCheckBox" + i).is(':checked')) {
                $scope.expenseAddQueue.push("" + $("#expenseCheckBox" + i).val());
            }
        }

        $scope.nextExpenseFromQueue();
    }

    $scope.nextExpenseFromQueue = function() {
        $("#inputExpenseDescription").val($scope.expenseAddQueue.pop());
    };

    $scope.toggleAddExpense = function() {
        $scope.showAddExpense = !$scope.showAddExpense;
        $scope.showEditExpense = false;

        if ($("#expensesCollapsible .collapsible-header:first").attr('class').indexOf("active") !== -1) {
            $("#expensesCollapsible .collapsible-header:first").trigger('click');
        }
    };

    $scope.toggleEditExpense = function() {
        $scope.showEditExpense = !$scope.showEditExpense;
    };

    $scope.filterExpenseGraph = function() {
        $scope.expenseGraphManager.setRange($("#beginingExpenseDate").val(), $("#endExpenseDate").val(), $scope.expenseDetails);
    };

    ////////////////////////////////////////////////////////////////////////
    // Renovations
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewRenovation = function(renovationDetails) {
        $scope.renovationDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": $('#inputRenovationDescription').val(),
            "cost": renovationDetails.cost,
            "quantity": renovationDetails.quantity,
            "paidTo": renovationDetails.paidTo,
            "invoiceNumber": renovationDetails.invoiceNumber,
            "invoiceDate": $('#inputRenovationInvoiceDate').val()
        });

        $scope.renovationGraphManager.update($scope.renovationDetails);
        $scope.reloadPropertyGraph();
        $scope.PD = {};
        swal("Great work!", "You have added a renovation for this property!", "success");

        if ($scope.renovationAddQueue.length != 0) {
            $scope.nextRenovationFromQueue();
            $("#inputRenovationCost").val("");

        } else {
            $("#inputRenovationDescription").val("");
            $("#inputRenovationPaidTo").val("");
            $("#inputRenovationInvoiceNumber").val("");
            $("#inputRenovationInvoiceDate").val("");
            $("#inputRenovationCost").val("");
            $("#inputRenovationQuantity").val("");
            $scope.showAddRenovation = false;
        }
    };

    $scope.deleteRenovation = function() {

        var renovationToDelete = "";
        angular.forEach($scope.renovationDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                renovationToDelete = selected;
            }
        });

        if (renovationToDelete != "") {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this renovation!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function() {
                    var newDataList = [];

                    $scope.selectedAll = false;

                    angular.forEach($scope.renovationDetails, function(selected) {
                        if (selected != renovationToDelete) {

                            newDataList.push(selected);
                        }
                    });
                    $scope.renovationDetails = newDataList;
                    $scope.$apply();
                    swal("Deleted!", "Your renovation has been deleted.", "success");
                    $scope.renovationGraphManager.update($scope.renovationDetails);
                    $scope.reloadPropertyGraph();
                });
        } else {
            swal({
                title: "Error",
                text: "Please select a renovation to delete.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.editRenovation = function(renovationDetails) {
        var newDataList = [];

        angular.forEach($scope.renovationDetails, function(selected) {
            if (selected != $scope.selectedRenovation) {

                newDataList.push(selected);
            }
        });
        $scope.renovationDetails = newDataList;

        $scope.renovationDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": $("#inputRenovationDescription").val(),
            "cost": $("#inputRenovationCost").val(),
            "quantity": $("#inputRenovationQuantity").val(),
            "paidTo": $("#inputRenovationPaidTo").val(),
            "invoiceNumber": $("#inputRenovationInvoiceNumber").val(),
            "invoiceDate": $("#inputRenovationInvoiceDate").val()
        });
        $scope.PD = {};
        $scope.renovationGraphManager.update($scope.renovationDetails);
        $scope.reloadPropertyGraph();

        swal("Great work!", "You have edited this renovation!", "success");

        $("#inputRenovationDescription").val("");
        $("#inputRenovationPaidTo").val("");
        $("#inputRenovationInvoiceNumber").val("");
        $("#inputRenovationInvoiceDate").val("");
        $("#inputRenovationCost").val("");
        $("#inputRenovationQuantity").val("");

        $scope.showAddRenovation = false;
        $scope.showEditRenovation = false;
    }

    $scope.selectRenovationToEdit = function() {
        var renovationToEdit = "";
        angular.forEach($scope.renovationDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                renovationToEdit = selected;
            }
        });
        if (renovationToEdit != "") {
            $scope.selectedRenovation = renovationToEdit;

            $("#inputRenovationDescription").val($scope.selectedRenovation.description);
            $("#inputRenovationPaidTo").val($scope.selectedRenovation.paidTo);
            $("#inputRenovationInvoiceNumber").val($scope.selectedRenovation.invoiceNumber);
            $("#inputRenovationInvoiceDate").val($scope.selectedRenovation.invoiceDate);
            $("#inputRenovationCost").val($scope.selectedRenovation.cost);
            $("#inputRenovationQuantity").val($scope.selectedRenovation.quantity);

            $scope.showAddRenovation = false;
            $scope.showEditRenovation = true;

            Materialize.updateTextFields();
            $scope.showAddRenovation = false;
            $scope.showEditRenovation = true;

        } else {
            swal({
                title: "Error",
                text: "Please select a renovation to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.repeatRenovation = function() {
        var renovationToRepeat = "";
        angular.forEach($scope.renovationDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                renovationToRepeat = selected;
            }
        });

        if (renovationToRepeat != "") {
            $scope.selectedRenovation = renovationToRepeat;

            swal({
                    title: "Notice",
                    text: "Do you want to upload an invoice?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "No",
                    cancelButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $scope.renovationDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedRenovation.groupName,
                            "description": $scope.selectedRenovation.description,
                            "cost": $scope.selectedRenovation.cost,
                            "quantity": $scope.selectedRenovation.quantity,
                            "paidTo": $scope.selectedRenovation.paidTo,
                            "invoiceDate": "",

                        });
                        $scope.PD = {};
                        $scope.$apply();
                        swal("Great work!", "This renovation has been tracked", "success")

                    } else {
                        $scope.renovationDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedRenovation.groupName,
                            "description": $scope.selectedRenovation.description,
                            "cost": $scope.selectedRenovation.cost,
                            "quantity": $scope.selectedRenovation.quantity,
                            "paidTo": $scope.selectedRenovation.paidTo,
                            "invoiceDate": $scope.selectedRenovation.invoiceDate,

                        });
                        $scope.PD = {};
                        $scope.$apply();

                        swal("Great work!", "Todo Fix", "success")
                    }
                });

        } else {
            swal({
                title: "Error",
                text: "Please select a renovation to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.getTotalRenovationCost = function(groupName) {
        var total = 0;

        if (groupName == "") {
            angular.forEach($scope.renovationDetails, function(selected) {
                total += selected.cost * selected.quantity;
            });


        } else {
            angular.forEach($scope.renovationDetails, function(selected) {
                if (selected.groupName == groupName) {
                    total += selected.cost * selected.quantity;
                }

            });
        }

        return total;

    };

    $scope.insertQuickRenovations = function() {
        for (var i = 1; i <= 55; i++) {
            if ($("#renovationCheckBox" + i).is(':checked')) {
                $scope.renovationAddQueue.push("" + $("#renovationCheckBox" + i).val());
            }
        }
        $scope.nextRenovationFromQueue();
    }

    $scope.nextRenovationFromQueue = function() {
        $("#inputRenovationDescription").val($scope.renovationAddQueue.pop());
    };

    $scope.toggleAddRenovation = function() {

        $scope.showAddRenovation = !$scope.showAddRenovation;
        $scope.showEditRenovation = false;

        if ($("#renovationCollapsible .collapsible-header:first").attr('class').indexOf("active") !== -1) {
            $("#renovationCollapsible .collapsible-header:first").trigger('click');
        }
    };

    $scope.toggleEditRenovation = function() {

        $scope.showEditRenovation = !$scope.showEditRenovation;
    };

    $scope.filterRenovationGraph = function() {
        $scope.renovationGraphManager.setRange($("#beginingRenovationDate").val(), $("#endRenovationDate").val(), $scope.renovationDetails);
    };

    ////////////////////////////////////////////////////////////////////////
    // @Sales
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewSale = function(saleDetails) {

        $scope.saleDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": $("#inputSaleDescription").val(),
            "cost": $("#inputSaleCost").val(),
            "supplier": $("#inputSaleSupplier").val(),
            "documentDate": $("#inputSaleDocumentDate").val()

        });
        $scope.PD = {};

        swal("Great work!", "You have added a sale for this property!", "success")

        if ($scope.saleAddQueue.length != 0) {
            $scope.nextSaleFromQueue();
            $("#inputSaleCost").val("");
            $("#inputSaleSupplier").val("");

        } else {
            $("#inputSaleDescription").val("");
            $("#inputSaleCost").val("");
            $("#inputSaleSupplier").val("");
            $("#inputSaleDocumentDate").val("");

            $scope.showAddSale = false;
        }

    };

    $scope.deleteSale = function() {

        var saleToDelete = "";
        angular.forEach($scope.saleDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                saleToDelete = selected;
            }
        });

        if (saleToDelete != "") {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this sale!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function() {
                    var newDataList = [];

                    $scope.selectedAll = false;

                    angular.forEach($scope.saleDetails, function(selected) {
                        if (selected != saleToDelete) {

                            newDataList.push(selected);
                        }
                    });
                    $scope.saleDetails = newDataList;
                    $scope.$apply();
                    swal("Deleted!", "Your sale has been deleted.", "success");
                });
        } else {
            swal({
                title: "Error",
                text: "Please select a sale to delete.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.editSale = function(saleDetails) {
        var newDataList = [];

        angular.forEach($scope.saleDetails, function(selected) {
            if (selected != $scope.selectedSale) {

                newDataList.push(selected);
            }
        });
        $scope.saleDetails = newDataList;

        $scope.saleDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": $("#inputSaleDescription").val(),
            "cost": $("#inputSaleCost").val()
        });

        swal("Great work!", "You have edited this sale!", "success");
        $scope.showEditSale = false;
        $("#inputSaleDescription").val("");
        $("#inputSaleCost").val("");
        $("#inputSaleSupplier").val("");
        $("#inputSaleDocumentDate").val("");

        $scope.showAddSale = false;
        $scope.showEditSale = false;
    }

    $scope.selectSaleToEdit = function() {

        $scope.showAddSale = false;
        $scope.showEditSale = true;

        var saleToEdit = "";
        angular.forEach($scope.saleDetails, function(selected) {

            if ($("#" + selected.description + "radio").is(':checked')) {
                saleToEdit = selected;
            }
        });
        if (saleToEdit != "") {
            $scope.selectedSale = saleToEdit;

            $("#inputSaleDescription").val($scope.selectedSale.description);
            $("#inputSaleCost").val($scope.selectedSale.cost);

            $("#inputSaleSupplier").val($scope.selectedSale.supplier);
            $("#inputSaleDocumentDate").val($scope.selectedSale.documentDate);

            $scope.toggleEditSale();
            Materialize.updateTextFields();


        } else {
            swal({
                title: "Error",
                text: "Please select a sale to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.repeatSale = function() {
        var saleToRepeat = "";
        angular.forEach($scope.saleDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                saleToRepeat = selected;
            }
        });

        if (saleToRepeat != "") {
            $scope.selectedSale = saleToRepeat;

            swal({
                    title: "Notice",
                    text: "Do you want to upload an invoice?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "No",
                    cancelButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $scope.saleDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedSale.groupName,
                            "description": $scope.selectedSale.description,
                            "cost": $scope.selectedSale.cost,
                            "quantity": $scope.selectedSale.quantity,
                            "paidTo": $scope.selectedSale.paidTo,
                            "invoiceDate": "",

                        });
                        $scope.PD = {};
                        $scope.$apply();
                        swal("Great work!", "This sale has been tracked", "success")

                    } else {
                        $scope.saleDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedSale.groupName,
                            "description": $scope.selectedSale.description,
                            "cost": $scope.selectedSale.cost,
                            "quantity": $scope.selectedSale.quantity,
                            "paidTo": $scope.selectedSale.paidTo,
                            "invoiceDate": $scope.selectedSale.invoiceDate,

                        });
                        $scope.PD = {};
                        $scope.$apply();

                        swal("Great work!", "Todo Fix", "success")
                    }
                });

        } else {
            swal({
                title: "Error",
                text: "Please select a sale to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.getTotalSaleCost = function(groupName) {
        var total = 0;

        if (groupName == "") {
            angular.forEach($scope.saleDetails, function(selected) {
                total += selected.cost;
            });


        } else {
            angular.forEach($scope.saleDetails, function(selected) {
                if (selected.groupName == groupName) {
                    total += selected.cost;
                }

            });
        }

        return total;
    };

    $scope.insertQuickSales = function() {

        for (var i = 1; i <= 7; i++) {
            if ($("#saleCheckBox" + i).is(':checked')) {
                $scope.saleAddQueue.push("" + $("#saleCheckBox" + i).val());
            }
        }

        $scope.nextSaleFromQueue();
    }

    $scope.nextSaleFromQueue = function() {
        $("#inputSaleDescription").val($scope.saleAddQueue.pop());
    };

    $scope.toggleAddSale = function() {
        $scope.showAddSale = !$scope.showAddSale;
        $scope.showEditSale = false;

        if ($("#salesCollapsible .collapsible-header:first").attr('class').indexOf("active") !== -1) {
            $("#salesCollapsible .collapsible-header:first").trigger('click');
        }
    };

    $scope.toggleEditSale = function() {

        $scope.showEditSale = !$scope.showEditSale;
    };

    ////////////////////////////////////////////////////////////////////////
    // @SaleAgents
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewSaleAgent = function(saleAgentDetails) {

        $scope.saleAgentDetails.push({
            "propertyID": $scope.selectedProperty,
            "company": saleAgentDetails.company,
            "fullName": saleAgentDetails.fullName,
            "cellNumber": saleAgentDetails.cellNumber,
            "email": saleAgentDetails.email,
            "valuation": saleAgentDetails.valuation,
            "valuationDate": $('#inputSaleAgentValuationDate').val()
        });
        $scope.PD = {};
        $scope.showAddSaleAgent = false;
        $scope.saleAgentGraphManager.addData(saleAgentDetails.fullName, saleAgentDetails.fullName, saleAgentDetails.valuation);

        $("#inputSaleAgentCompany").val("");
        $("#inputSaleAgentFullName").val("");
        $("#inputSaleAgentCellPhone").val("");
        $("#inputSaleAgentEmail").val("");
        $("#inputSaleAgentValuation").val("");
        $("#inputSaleAgentValuationDate").val("");

        swal("Great work!", "You have added a saleAgent for this property!", "success")
    };

    $scope.deleteSaleAgent = function() {

        var saleAgentToDelete = "";
        angular.forEach($scope.saleAgentDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                saleAgentToDelete = selected;
            }
        });

        if (saleAgentToDelete != "") {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this saleAgent!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function() {
                    var newDataList = [];

                    $scope.selectedAll = false;

                    angular.forEach($scope.saleAgentDetails, function(selected) {
                        if (selected != saleAgentToDelete) {

                            newDataList.push(selected);
                        }
                    });
                    $scope.saleAgentDetails = newDataList;
                    $scope.$apply();
                    swal("Deleted!", "Your saleAgent has been deleted.", "success");
                    $scope.saleAgentGraphManager.removeData(saleAgentToDelete.fullName, saleAgentToDelete.fullName, saleAgentToDelete.valuation);

                });
        } else {
            swal({
                title: "Error",
                text: "Please select a saleAgent to delete.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.editSaleAgent = function(saleAgentDetails) {
        var newDataList = [];

        angular.forEach($scope.saleAgentDetails, function(selected) {
            if (selected != $scope.selectedSaleAgent) {

                newDataList.push(selected);
            }
        });
        $scope.saleAgentDetails = newDataList;

        $scope.saleAgentDetails.push({
            "propertyID": $scope.selectedProperty,
            "company": $("#inputSaleAgentCompany").val(),
            "fullName": $("#inputSaleAgentFullName").val(),
            "cellNumber": $("#inputSaleAgentCellPhone").val(),
            "email": $("#inputSaleAgentEmail").val(),
            "valuation": $("#inputSaleAgentValuation").val(),
            "valuationDate": $("#inputSaleAgentValuationDate").val()
        });
        $scope.PD = {};

        swal("Great work!", "You have edited this saleAgent!", "success");

        $scope.saleAgentGraphManager.removeData($scope.selectedSaleAgent.fullName, $scope.selectedSaleAgent.fullName, $scope.selectedSaleAgent.valuation);
        $scope.saleAgentGraphManager.addData($("#inputSaleAgentFullName").val(), $("#inputSaleAgentFullName").val(), $("#inputSaleAgentValuation").val());

        $scope.showEditSaleAgent = false;
        $scope.showAddSaleAgent = false;

        $("#inputSaleAgentCompany").val("");
        $("#inputSaleAgentFullName").val("");
        $("#inputSaleAgentCellPhone").val("");
        $("#inputSaleAgentEmail").val("");
        $("#inputSaleAgentValuation").val("");
        $("#inputSaleAgentValuationDate").val("");
    }

    $scope.selectSaleAgentToEdit = function() {
        var saleAgentToEdit = "";
        angular.forEach($scope.saleAgentDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                saleAgentToEdit = selected;
            }
        });
        if (saleAgentToEdit != "") {
            $scope.selectedSaleAgent = saleAgentToEdit;

            $("#inputSaleAgentCompany").val($scope.selectedSaleAgent.company);
            $("#inputSaleAgentFullName").val($scope.selectedSaleAgent.fullName);
            $("#inputSaleAgentCellPhone").val($scope.selectedSaleAgent.cellNumber);
            $("#inputSaleAgentEmail").val($scope.selectedSaleAgent.email);
            $("#inputSaleAgentValuation").val($scope.selectedSaleAgent.valuation);
            $("#inputSaleAgentValuationDate").val($scope.selectedSaleAgent.valuationDate);

            $scope.showEditSaleAgent = true;
            $scope.showAddSaleAgent = false;

            Materialize.updateTextFields();


        } else {
            swal({
                title: "Error",
                text: "Please select a saleAgent to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.repeatSaleAgent = function() {
        var saleAgentToRepeat = "";
        angular.forEach($scope.saleAgentDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                saleAgentToRepeat = selected;
            }
        });

        if (saleAgentToRepeat != "") {
            $scope.selectedSaleAgent = saleAgentToRepeat;

            swal({
                    title: "Notice",
                    text: "Do you want to upload an invoice?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "No",
                    cancelButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $scope.saleAgentDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedSaleAgent.groupName,
                            "description": $scope.selectedSaleAgent.description,
                            "cost": $scope.selectedSaleAgent.cost,
                            "quantity": $scope.selectedSaleAgent.quantity,
                            "paidTo": $scope.selectedSaleAgent.paidTo,
                            "invoiceDate": "",

                        });
                        $scope.PD = {};
                        $scope.$apply();
                        swal("Great work!", "This saleAgent has been tracked", "success")

                    } else {
                        $scope.saleAgentDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedSaleAgent.groupName,
                            "description": $scope.selectedSaleAgent.description,
                            "cost": $scope.selectedSaleAgent.cost,
                            "quantity": $scope.selectedSaleAgent.quantity,
                            "paidTo": $scope.selectedSaleAgent.paidTo,
                            "invoiceDate": $scope.selectedSaleAgent.invoiceDate,

                        });
                        $scope.PD = {};
                        $scope.$apply();

                        swal("Great work!", "Todo Fix", "success")
                    }
                });

        } else {
            swal({
                title: "Error",
                text: "Please select a saleAgent to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.getAverageSaleAgentCost = function(groupName) {
        var total = 0;

        if (groupName == "") {
            angular.forEach($scope.saleAgentDetails, function(selected) {
                total += selected.valuation;
            });


        }

        return total / $scope.saleAgentDetails.length;
    };

    $scope.toggleAddSaleAgent = function() {
        $scope.showAddSaleAgent = !$scope.showAddSaleAgent;
        $scope.showEditSaleAgent = false;

        if ($("#saleAgentCollapsible .collapsible-header:first").attr('class').indexOf("active") !== -1) {
            $("#saleAgentCollapsible .collapsible-header:first").trigger('click');
        }
    };


    $scope.toggleEditSaleAgent = function() {

        $scope.showEditSaleAgent = !$scope.showEditSaleAgent;
    };

    ////////////////////////////////////////////////////////////////////////
    // Rental
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewRent = function(rentDetails) {
        if (typeof $scope.tentantDetails === 'undefined' || $scope.tentantDetails.length == 0) {
            swal({
                title: "Error",
                text: "Please add a tentant before recording the sale of a property.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });
            return;
        }

        $scope.rentDetails.push({
            "propertyID": $scope.selectedProperty,
            "tentantFullName": $("#inputRentTentantFullName").val(),
            "invoiceDate": $("#inputRentInvoiceDate").val(),
            "invoiceAmount": $("#inputRentInvoiceAmount").val(),
            "proofOfPaymentDate": $("#inputRentProofOfPaymentDate").val(),
            "proofOfPaymentAmount": $("#inputRentProofOfPaymentAmount").val()
        });

        $scope.PD = {};

        swal("Great work!", "You have added a rent for this property!", "success");
        $scope.reloadPropertyGraph();
        $scope.showAddRent = false;

    };

    $scope.deleteRent = function() {

        var rentToDelete = "";
        angular.forEach($scope.rentDetails, function(selected) {

            if ($("#" + selected.tentantFullName + "Rentradio").is(':checked')) {
                rentToDelete = selected;
            }
        });

        if (rentToDelete != "") {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this rent!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function() {
                    var newDataList = [];

                    $scope.selectedAll = false;

                    angular.forEach($scope.rentDetails, function(selected) {
                        if (selected != rentToDelete) {

                            newDataList.push(selected);
                        }
                    });
                    $scope.rentDetails = newDataList;
                    $scope.$apply();
                    $scope.reloadPropertyGraph();
                    swal("Deleted!", "Your rent has been deleted.", "success");
                });
        } else {
            swal({
                title: "Error",
                text: "Please select a rent to delete.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.editRent = function(rentDetails) {
        var newDataList = [];

        angular.forEach($scope.rentDetails, function(selected) {
            if (selected != $scope.selectedRent) {

                newDataList.push(selected);
            }
        });
        $scope.rentDetails = newDataList;

        $scope.rentDetails.push({
            "propertyID": $scope.selectedProperty,
            "tentantFullName": $("#inputRentTentantFullName").val(),
            "invoiceDate": $("#inputRentInvoiceDate").val(),
            "invoiceAmount": $("#inputRentInvoiceAmount").val(),
            "proofOfPaymentDate": $("#inputRentProofOfPaymentDate").val(),
            "proofOfPaymentAmount": $("#inputRentProofOfPaymentAmount").val()
        });
        $scope.PD = {};

        $scope.reloadPropertyGraph();
        $scope.showEditRent = false;
        swal("Great work!", "You have edited this rent!", "success");
        $("#inputRentTentantFullName").val("");
        $("#inputRentInvoiceDate").val("");
        $("#inputRentInvoiceAmount").val("");
        $("#inputRentProofOfPaymentDate").val("");
        $("#inputRentProofOfPaymentAmount").val("");
    }

    $scope.selectRentToEdit = function() {
        var rentToEdit = "";
        angular.forEach($scope.rentDetails, function(selected) {

            if ($("#" + selected.tentantFullName + "Rentradio").is(':checked')) {
                rentToEdit = selected;
            }
        });
        if (rentToEdit != "") {
            $scope.selectedRent = rentToEdit;

            $("#editRentTentantName").val($scope.selectedRent.tentantFullName + "");
            $("#editRentInvoiceDate").val($scope.selectedRent.invoiceDate);
            $("#editRentInvoiceAmount").val($scope.selectedRent.invoiceAmount);
            $("#editRentProofOfPaymentDate").val($scope.selectedRent.proofOfPaymentDate);
            $("#editRentProofOfPaymentAmount").val($scope.selectedRent.proofOfPaymentAmount);

            $scope.toggleEditRent();
            Materialize.updateTextFields();


        } else {
            swal({
                title: "Error",
                text: "Please select a rent to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.repeatRent = function() {
        var rentToRepeat = "";
        angular.forEach($scope.rentDetails, function(selected) {

            if ($("#" + selected.tentantFullName + "Rentradio").is(':checked')) {
                rentToRepeat = selected;
            }
        });

        if (rentToRepeat != "") {
            $scope.selectedRent = rentToRepeat;

            swal({
                    title: "Notice",
                    text: "Do you want to upload an invoice?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "No",
                    cancelButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $scope.rentDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedRent.groupName,
                            "description": $scope.selectedRent.description,
                            "cost": $scope.selectedRent.cost,
                            "quantity": $scope.selectedRent.quantity,
                            "paidTo": $scope.selectedRent.paidTo,
                            "invoiceDate": "",

                        });
                        $scope.PD = {};
                        $scope.$apply();
                        swal("Great work!", "This rent has been tracked", "success")

                    } else {
                        $scope.rentDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedRent.groupName,
                            "description": $scope.selectedRent.description,
                            "cost": $scope.selectedRent.cost,
                            "quantity": $scope.selectedRent.quantity,
                            "paidTo": $scope.selectedRent.paidTo,
                            "invoiceDate": $scope.selectedRent.invoiceDate,

                        });
                        $scope.PD = {};
                        $scope.$apply();

                        swal("Great work!", "Todo Fix", "success")
                    }
                });

        } else {
            swal({
                title: "Error",
                text: "Please select a rent to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.getTotalRentIncome = function(fullName) {
        var total = 0;

        if (fullName == "") {
            angular.forEach($scope.rentDetails, function(selected) {
                total += selected.proofOfPaymentAmount;
            });


        } else {
            angular.forEach($scope.rentDetails, function(selected) {
                if (selected.tentantFullName == fullName) {
                    total += selected.proofOfPaymentAmount;
                }

            });
        }

        return total;
    };
    $scope.getTotalRentBalance = function(fullName) {
        var total = 0;

        if (fullName == "") {
            angular.forEach($scope.rentDetails, function(selected) {
                total += selected.proofOfPaymentAmount - selected.invoiceAmount;
            });


        } else {
            angular.forEach($scope.rentDetails, function(selected) {
                if (selected.tentantFullName == fullName) {
                    total += selected.proofOfPaymentAmount - selected.invoiceAmount;
                }

            });
        }

        return total;
    };

    $scope.toggleAddRent = function() {
        if (typeof $scope.tentantDetails === 'undefined' || $scope.tentantDetails.length == 0) {
            swal({
                title: "Error",
                text: "Please add a tentant before recording the sale of a property.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });
            return;
        } else {
            $scope.showAddRent = !$scope.showAddRent;

            if ($("#rentCollapsible .collapsible-header:first").attr('class').indexOf("active") !== -1) {
                $("#rentCollapsible .collapsible-header:first").trigger('click');
            }
        }
    };


    $scope.toggleEditRent = function() {

        $scope.showEditRent = !$scope.showEditRent;
    };

    ////////////////////////////////////////////////////////////////////////
    // @Tentants
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewTentant = function(tentantDetails) {

        $scope.tentantDetails.push({
            "propertyID": $scope.selectedProperty,
            "fullName": tentantDetails.fullName,
            "idNumber": tentantDetails.idNumber,
            "cellNumber": tentantDetails.cellNumber,
            "email": tentantDetails.email,
            "employer": tentantDetails.employer,
            "employerCellNumber": tentantDetails.employerCellNumber,
            "workAddress": tentantDetails.workAddress,
            "rentPerMonth": tentantDetails.rentPerMonth,
            "rentDuration": tentantDetails.rentDuration,
            "rentEscalation": tentantDetails.rentEscalation,
            "rentDeposit": tentantDetails.rentDeposit
        });
        $scope.PD = {};
        $scope.showAddTentant = false;

        swal("Great work!", "You have added an tentant for this property!", "success")
    };

    $scope.deleteTentant = function() {

        var tentantToDelete = "";
        angular.forEach($scope.tentantDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                tentantToDelete = selected;
            }
        });

        if (tentantToDelete != "") {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this tentant!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function() {
                    var newDataList = [];

                    $scope.selectedAll = false;

                    angular.forEach($scope.tentantDetails, function(selected) {
                        if (selected != tentantToDelete) {

                            newDataList.push(selected);
                        }
                    });
                    $scope.tentantDetails = newDataList;
                    $scope.$apply();
                    swal("Deleted!", "Your tentant has been deleted.", "success");
                });
        } else {
            swal({
                title: "Error",
                text: "Please select an tentant to delete.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.editTentant = function(tentantDetails) {
        var newDataList = [];

        angular.forEach($scope.tentantDetails, function(selected) {
            if (selected != $scope.selectedTentant) {

                newDataList.push(selected);
            }
        });
        $scope.tentantDetails = newDataList;

        $scope.tentantDetails.push({
            "propertyID": $scope.selectedProperty,

            "fullName": $("#editTentantFullName").val(),
            "idNumber": $("#editTentantIdNumber").val(),
            "cellNumber": $("#editTentantCellNumber").val(),
            "email": $("#editTentantEmail").val(),
            "employer": $("#editTentantEmployer").val(),
            "workAddress": $("#editTentantWorkAddress").val(),
            "rentPerMonth": $("#editTentantRentPerMonth").val(),
            "rentDuration": $("#editTentantRentDuration").val(),
            "rentEscalation": $("#editTentantRentEscalation").val(),
            "rentDeposit": $("#editTentantRentDeposit").val()
        });
        $scope.PD = {};


        swal("Great work!", "You have edited this tentant!", "success");
        $scope.showEditTentant = false;
        $("#editTentantFullName").val("");
        $("#editTentantIdNumber").val("");
        $("#editTentantCellNumber").val("");
        $("#editTentantEmail").val("");
        $("#editTentantEmployer").val("");
        $("#editTentantWorkAddress").val("");
        $("#editTentantRentPerMonth").val("");
        $("#editTentantRentDuration").val("");
        $("#editTentantRentEscalation").val("");
        $("#editTentantRentDeposit").val("");
    }

    $scope.selectTentantToEdit = function() {
        var tentantToEdit = "";
        angular.forEach($scope.tentantDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                tentantToEdit = selected;
            }
        });
        if (tentantToEdit != "") {
            $scope.selectedTentant = tentantToEdit;

            $("#editTentantFullName").val($scope.selectedTentant.fullName);
            $("#editTentantIdNumber").val($scope.selectedTentant.idNumber);
            $("#editTentantCellNumber").val($scope.selectedTentant.cellNumber);
            $("#editTentantEmail").val($scope.selectedTentant.email);
            $("#editTentantEmployer").val($scope.selectedTentant.employer);
            $("#editTentantWorkAddress").val($scope.selectedTentant.workAddress);
            $("#editTentantRentPerMonth").val($scope.selectedTentant.rentPerMonth);
            $("#editTentantRentDuration").val($scope.selectedTentant.rentDuration);
            $("#editTentantRentEscalation").val($scope.selectedTentant.rentEscalation);
            $("#editTentantRentDeposit").val($scope.selectedTentant.rentDeposit);

            $scope.toggleEditTentant();
            Materialize.updateTextFields();


            document.querySelector('#editTenantDiv').scrollIntoView();


        } else {
            swal({
                title: "Error",
                text: "Please select an tentant to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.repeatTentant = function() {
        var tentantToRepeat = "";
        angular.forEach($scope.tentantDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                tentantToRepeat = selected;
            }
        });

        if (tentantToRepeat != "") {
            $scope.selectedTentant = tentantToRepeat;

            swal({
                    title: "Notice",
                    text: "Do you want to upload an invoice?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "No",
                    cancelButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $scope.tentantDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedTentant.groupName,
                            "description": $scope.selectedTentant.description,
                            "cost": $scope.selectedTentant.cost,
                            "quantity": $scope.selectedTentant.quantity,
                            "paidTo": $scope.selectedTentant.paidTo,
                            "invoiceDate": "",

                        });
                        $scope.PD = {};
                        $scope.$apply();
                        swal("Great work!", "This tentant has been tracked", "success")

                    } else {
                        $scope.tentantDetails.push({
                            "propertyID": $scope.selectedProperty,
                            "groupName": $scope.selectedTentant.groupName,
                            "description": $scope.selectedTentant.description,
                            "cost": $scope.selectedTentant.cost,
                            "quantity": $scope.selectedTentant.quantity,
                            "paidTo": $scope.selectedTentant.paidTo,
                            "invoiceDate": $scope.selectedTentant.invoiceDate,

                        });
                        $scope.PD = {};
                        $scope.$apply();

                        swal("Great work!", "Todo Fix", "success")
                    }
                });

        } else {
            swal({
                title: "Error",
                text: "Please select an tentant to Edit.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.getTotalTentantCost = function(groupName) {
        var total = 0;

        if (groupName == "") {
            angular.forEach($scope.tentantDetails, function(selected) {
                total += selected.cost * selected.quantity;
            });


        } else {
            angular.forEach($scope.tentantDetails, function(selected) {
                if (selected.groupName == groupName) {
                    total += selected.cost * selected.quantity;
                }

            });
        }

        return total;
    };

    $scope.toggleAddTentant = function() {

        $scope.showAddTentant = !$scope.showAddTentant;
    };


    $scope.toggleEditTentant = function() {

        $scope.showEditTentant = !$scope.showEditTentant;
    };

}]);

function insertQuickTentant() {
    $("#addRentTentantName").val("");

    var name = "";

    for (var i = 1; i <= 58; i++) {
        if ($("#tentantRadio" + i).is(':checked')) {
            name = "" + $("#tentantRadio" + i).val();
        }
    }

    $("#addRentTentantName").val(name + "");
    $("#addRentTentantNameLabel").addClass("active");
}

app.directive('format', ['$filter', function($filter) {
    return {
        require: '?ngModel',
        link: function(scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function(a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            elem.bind('blur', function(event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
            });
        }
    };

}]);
