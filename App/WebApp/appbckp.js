var app = angular.module("propertyInvestor", []);

app.controller("propertyController", ["$scope", function($scope) {
    ////////////////////////////////////////////////////////////////////////
    // Variables
    ////////////////////////////////////////////////////////////////////////
    // Property 
    $scope.propertyDetails = [];
    $scope.numberOfproperties = 0;

    $scope.addPropertyForm = false;
    $scope.viewProperty = false;
    $scope.editProperty = false;

    $scope.selectedProperty = "EMPTY";

    // Expense
    $scope.expenseDetails = [];
    $scope.expenseGroups = [];

    $scope.showAddExpense = false;
    $scope.showEditExpense = false;

    $scope.selectedExpense = "EMPTY";

    // Renovation
    $scope.renovationDetails = [];
    $scope.renovationGroups = [];

    $scope.showAddRenovation = false;
    $scope.showEditRenovation = false;

    $scope.selectedRenovation = "EMPTY";

    // Sales
    $scope.saleDetails = [];

    $scope.showAddSale = false;
    $scope.showEditSale = false;

    $scope.selectedSale = "EMPTY";

    // SaleAgents
    $scope.saleAgentDetails = [];

    $scope.showAddSaleAgent = false;
    $scope.showEditSaleAgent = false;

    $scope.selectedSaleAgent = "EMPTY";

    // Rent
    $scope.rentDetails = [];

    $scope.showAddRent = false;
    $scope.showEditRent = false;

    $scope.selectedRent = "EMPTY";

    // Tentants
    $scope.tentantDetails = [];

    $scope.showAddTentant = false;
    $scope.showEditTentant = false;

    $scope.selectedTentant = "EMPTY";

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
            $scope.toggleAddProprty();
            return;
        }

        $scope.propertyDetails.push({
            "houseNumber": propertyDetails.houseNumber,
            "occupant": propertyDetails.occupant,
            "type": propertyDetails.type,
            "houseNumber": propertyDetails.houseNumber,
            "suburb": propertyDetails.suburb,
            "complexName": propertyDetails.complexName,
            "complexNumber": propertyDetails.complexNumber,
            "province": propertyDetails.province,
            "areaPostalCode": propertyDetails.areaPostalCode,
            "standSize": propertyDetails.standSize,
            "standSizeCoverd": propertyDetails.standSizeCoverd,
            "standSizeUncovered": propertyDetails.standSizeUncovered,
            "depositAmount": propertyDetails.depositAmount,
            "bondAmount": propertyDetails.bondAmount,
            "bondRegistration": propertyDetails.bondRegistration,
            "period": propertyDetails.period,
            "interesetRate": propertyDetails.interesetRate,
            "monthlyInstallments": propertyDetails.monthlyInstallments,
            "transferFees": propertyDetails.transferFees,
            "transferDuty": propertyDetails.transferDuty,
            "auctionCost": propertyDetails.auctionCost,
            "purchaseAmount": propertyDetails.purchaseAmount,
            "complexName": propertyDetails.complexName,
            "complexNumber": propertyDetails.complexNumber

        });
        $scope.PD = {};
        $scope.numberOfproperties = $scope.numberOfproperties + 1;

        if ($scope.numberOfproperties == 1) {
            $("#numberOfpropertiesNavBar").text($scope.numberOfproperties + " Property");

        } else {
            $("#numberOfpropertiesNavBar").text($scope.numberOfproperties + " Properties");
        }
        $scope.toggleAddProprty();
        swal("Great work!", "You have added a property!", "success")
    };

    $scope.editPropertyF = function() {
        $scope.editProperty = true;
        $scope.viewProperty = false;
    }

    $scope.editPropertyConfirm = function(propertyDetails) {

        var count = 0;

        angular.forEach($scope.propertyDetails, function(selected) {
            if (selected.houseNumber == $scope.selectedProperty) {
                $scope.propertyDetails[count]["houseNumber"] = propertyDetails.houseNumber;
                $scope.propertyDetails[count]["occupant"] = propertyDetails.occupant;
                $scope.propertyDetails[count]["type"] = propertyDetails.type;
                $scope.propertyDetails[count]["houseNumber"] = propertyDetails.houseNumber;
                $scope.propertyDetails[count]["complexName"] = propertyDetails.complexName;
                $scope.propertyDetails[count]["complexNumber"] = propertyDetails.complexNumber;
                $scope.propertyDetails[count]["suburb"] = propertyDetails.suburb;
                $scope.propertyDetails[count]["province"] = propertyDetails.province;
                $scope.propertyDetails[count]["areaPostalCode"] = propertyDetails.areaPostalCode;
                $scope.propertyDetails[count]["standSize"] = propertyDetails.standSize;
                $scope.propertyDetails[count]["standSizeCoverd"] = propertyDetails.standSizeCoverd;
                $scope.propertyDetails[count]["standSizeUncovered"] = propertyDetails.standSizeUncovered;
                $scope.propertyDetails[count]["depositAmount"] = propertyDetails.depositAmount;
                $scope.propertyDetails[count]["bondAmount"] = propertyDetails.bondAmount;
                $scope.propertyDetails[count]["bondRegistration"] = propertyDetails.bondRegistration;
                $scope.propertyDetails[count]["period"] = propertyDetails.period;
                $scope.propertyDetails[count]["interesetRate"] = propertyDetails.interesetRate;
                $scope.propertyDetails[count]["monthlyInstallments"] = propertyDetails.monthlyInstallments;
                $scope.propertyDetails[count]["transferFees"] = propertyDetails.transferFees;
                $scope.propertyDetails[count]["transferDuty"] = propertyDetails.transferDuty;
                $scope.propertyDetails[count]["auctionCost"] = propertyDetails.auctionCost;
                $scope.propertyDetails[count]["purchaseAmount"] = propertyDetails.purchaseAmount;
                $scope.propertyDetails[count]["complexName"] = propertyDetails.complexName;
                $scope.propertyDetails[count]["complexNumber"] = propertyDetails.complexNumber;

            }
            count++;
        });

        $scope.editProperty = false;
        $scope.viewProperty = true;
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
                    if (selected.houseNumber != $scope.selectedProperty) {
                        newDataList.push(selected);
                    }
                });
                $scope.propertyDetails = newDataList;
                swal("Deleted!", "Your property has been deleted.", "success");
            });
    };

    $scope.toggleAddProprty = function() {
        $('ul.tabs').tabs('select_tab', 'propertyInformationTab');
        $scope.addPropertyForm = !$scope.addPropertyForm;
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
            $scope.toggleAddProprty();
        }
        $scope.selectedProperty = selectedProperty;
        $scope.toggleViewProperty();
    };

    ////////////////////////////////////////////////////////////////////////
    // Expenes
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewExpense = function(expenseDetails) {

        var expenses = $("#expenseInformationTextarea").val().split("\n");

        //if group exists
        var groupExists = false;
        angular.forEach($scope.expenseGroups, function(selected) {

            if (expenseDetails.groupName + "" == selected.groupName + "") {
                groupExists = true;
            }
        });

        if (!groupExists) {
            $scope.expenseGroups.push({
                "propertyID": $scope.selectedProperty,
                "groupName": expenseDetails.groupName
            });
        }

        for (var count = 0; count < expenses.length; count++) {
            expenseInformation = expenses[count].split(" ");

            $scope.expenseDetails.push({
                "propertyID": $scope.selectedProperty,
                "groupName": expenseDetails.groupName,
                "description": expenseInformation[0].toString(),
                "cost": expenseInformation[1].toString(),
                "quantity": expenseInformation[2].toString(),
                "paidTo": expenseDetails.paidTo,
                "invoiceNumber": expenseDetails.invoiceNumber,
                "invoiceDate": $('#datepickerExpense').val()
            });
        }
        $scope.PD = {};


        swal("Great work!", "You have added an expense for this property!", "success");
        $scope.showAddExpense = false;
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
    $scope.editExpense = function(expenseDetails) {
        var newDataList = [];

        angular.forEach($scope.expenseDetails, function(selected) {
            if (selected != $scope.selectedExpense) {

                newDataList.push(selected);
            }
        });
        $scope.expenseDetails = newDataList;

        //if group exists
        var groupExists = false;
        angular.forEach($scope.expenseGroups, function(selected) {

            if (expenseDetails.groupName + "" == selected.groupName + "") {
                groupExists = true;
            }
        });

        if (!groupExists) {
            $scope.expenseGroups.push({
                "propertyID": $scope.selectedProperty,
                "groupName": expenseDetails.groupName
            });
        }

        $scope.expenseDetails.push({
            "propertyID": $scope.selectedProperty,
            "groupName": $("#editExpenseGroupName").val(),
            "description": $("#editExpenseDescription").val(),
            "cost": $("#editExpenseCost").val(),
            "quantity": $("#editExpenseQuantity").val(),
            "paidTo": $("#editExpensePaidTo").val(),
            "invoiceNumber": expenseDetails.invoiceNumber,
            "invoiceDate": $("#editExpenseInvoiceDate").val()
        });
        $scope.PD = {};


        swal("Great work!", "You have edited this expense!", "success");
        $scope.showEditExpense = false;
        $("#editExpenseGroupName").val("");
        $("#editExpensePaidTo").val("");
        $("#editExpenseDescription").val("");
        $("#editExpenseCost").val("");
        $("#editExpenseQuantity").val("");
        $("#editExpenseInvoiceDate").val("");
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

            $("#editExpenseGroupName").val($scope.selectedExpense.groupName);
            $("#editExpensePaidTo").val($scope.selectedExpense.paidTo);
            $("#editExpenseDescription").val($scope.selectedExpense.description);
            $("#editExpenseCost").val($scope.selectedExpense.cost);
            $("#editExpenseQuantity").val($scope.selectedExpense.quantity);
            $("#editExpenseInvoiceDate").val($scope.selectedExpense.invoiceDate);

            $scope.toggleEditExpense();
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

    $scope.toggleAddExpense = function() {

        $scope.showAddExpense = !$scope.showAddExpense;
    };


    $scope.toggleEditExpense = function() {

        $scope.showEditExpense = !$scope.showEditExpense;
    };

    ////////////////////////////////////////////////////////////////////////
    // Renovations
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewRenovation = function(renovationDetails) {

        var renovations = $("#renovationInformationTextarea").val().split("\n");

        //if group exists
        var groupExists = false;
        angular.forEach($scope.renovationGroups, function(selected) {

            if (renovationDetails.groupName + "" == selected.groupName + "") {
                groupExists = true;
            }
        });

        if (!groupExists) {
            $scope.renovationGroups.push({
                "propertyID": $scope.selectedProperty,
                "groupName": renovationDetails.groupName
            });
        }

        for (var count = 0; count < renovations.length; count++) {
            renovationInformation = renovations[count].split(" ");

            $scope.renovationDetails.push({
                "propertyID": $scope.selectedProperty,
                "groupName": renovationDetails.groupName,
                "description": renovationInformation[0].toString(),
                "cost": renovationInformation[1].toString(),
                "quantity": renovationInformation[2].toString(),
                "paidTo": renovationDetails.paidTo,
                "invoiceNumber": renovationDetails.invoiceNumber,
                "invoiceDate": $('#datepickerRenovation').val()
            });
        }
        $scope.PD = {};


        swal("Great work!", "You have added a renovation for this property!", "success");
        $scope.showAddRenovation = false;
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

        //if group exists
        var groupExists = false;
        angular.forEach($scope.renovationGroups, function(selected) {

            if (renovationDetails.groupName + "" == selected.groupName + "") {
                groupExists = true;
            }
        });

        if (!groupExists) {
            $scope.renovationGroups.push({
                "propertyID": $scope.selectedProperty,
                "groupName": renovationDetails.groupName
            });
        }

        $scope.renovationDetails.push({
            "propertyID": $scope.selectedProperty,
            "groupName": $("#editRenovationGroupName").val(),
            "description": $("#editRenovationDescription").val(),
            "cost": $("#editRenovationCost").val(),
            "quantity": $("#editRenovationQuantity").val(),
            "paidTo": $("#editRenovationPaidTo").val(),
            "invoiceNumber": renovationDetails.invoiceNumber,
            "invoiceDate": $("#editRenovationInvoiceDate").val()
        });
        $scope.PD = {};


        swal("Great work!", "You have edited this renovation!", "success");
        $scope.showEditRenovation = false;
        $("#editRenovationGroupName").val("");
        $("#editRenovationPaidTo").val("");
        $("#editRenovationDescription").val("");
        $("#editRenovationCost").val("");
        $("#editRenovationQuantity").val("");
        $("#editRenovationInvoiceDate").val("");
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

            $("#editRenovationGroupName").val($scope.selectedRenovation.groupName);
            $("#editRenovationPaidTo").val($scope.selectedRenovation.paidTo);
            $("#editRenovationDescription").val($scope.selectedRenovation.description);
            $("#editRenovationCost").val($scope.selectedRenovation.cost);
            $("#editRenovationQuantity").val($scope.selectedRenovation.quantity);
            $("#editRenovationInvoiceDate").val($scope.selectedRenovation.invoiceDate);

            $scope.toggleEditRenovation();
            Materialize.updateTextFields();


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

    $scope.toggleAddRenovation = function() {

        $scope.showAddRenovation = !$scope.showAddRenovation;
    };

    $scope.toggleEditRenovation = function() {

        $scope.showEditRenovation = !$scope.showEditRenovation;
    };


    ////////////////////////////////////////////////////////////////////////
    // @Sales
    ////////////////////////////////////////////////////////////////////////
    $scope.addNewSale = function(saleDetails) {

        if (typeof $scope.saleAgentDetails === 'undefined' || $scope.saleAgentDetails.length == 0) {
            swal({
                title: "Error",
                text: "Please add a sale agent before recording the sale of a property.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });
            return;
        }

        $scope.saleDetails.push({
            "propertyID": $scope.selectedProperty,
            "agentName": saleDetails.agentName,
            "agentContactNumber": saleDetails.agentContactNumber,
            "agentEmailAddress": saleDetails.agentEmailAddress,
            "agentCost": saleDetails.agentCost,
            "agentInvoiceDate": saleDetails.agentInvoiceDate,
            "attorneyName": saleDetails.attorneyName,
            "attorneysCost": saleDetails.attorneysCost,
            "attorneyInvoiceDate": saleDetails.attorneyInvoiceDate,
            "council": saleDetails.council,
            "levies": saleDetails.levies
        });
        $scope.PD = {};

        swal("Great work!", "You have added a sale for this property!", "success")
        $scope.showAddSale = false;

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
            "groupName": $("#editSaleGroupName").val(),
            "description": $("#editSaleDescription").val(),
            "cost": $("#editSaleCost").val(),
            "quantity": $("#editSaleQuantity").val(),
            "paidTo": $("#editSalePaidTo").val(),
            "invoiceNumber": saleDetails.invoiceNumber,
            "invoiceDate": $("#editSaleInvoiceDate").val()
        });
        $scope.PD = {};


        swal("Great work!", "You have edited this sale!", "success");
        $scope.showEditSale = false;
        $("#editSaleGroupName").val("");
        $("#editSalePaidTo").val("");
        $("#editSaleDescription").val("");
        $("#editSaleCost").val("");
        $("#editSaleQuantity").val("");
        $("#editSaleInvoiceDate").val("");
    }

    $scope.selectSaleToEdit = function() {
        var saleToEdit = "";
        angular.forEach($scope.saleDetails, function(selected) {

            if ($("#" + selected.fullName + "radio").is(':checked')) {
                saleToEdit = selected;
            }
        });
        if (saleToEdit != "") {
            $scope.selectedSale = saleToEdit;

            $("#editSaleGroupName").val($scope.selectedSale.groupName);
            $("#editSalePaidTo").val($scope.selectedSale.paidTo);
            $("#editSaleDescription").val($scope.selectedSale.description);
            $("#editSaleCost").val($scope.selectedSale.cost);
            $("#editSaleQuantity").val($scope.selectedSale.quantity);
            $("#editSaleInvoiceDate").val($scope.selectedSale.invoiceDate);

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
                total += selected.cost * selected.quantity;
            });


        } else {
            angular.forEach($scope.saleDetails, function(selected) {
                if (selected.groupName == groupName) {
                    total += selected.cost * selected.quantity;
                }

            });
        }

        return total;
    };

    $scope.toggleAddSale = function() {
        if (typeof $scope.saleAgentDetails === 'undefined' || $scope.saleAgentDetails.length == 0) {
            swal({
                title: "Error",
                text: "Please add a sale agent before recording the sale of a property.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });
            return;
        }
        $scope.showAddSale = !$scope.showAddSale;
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
            "valuationDate": $('#datepickerSaleAgent').val()
        });
        $scope.PD = {};
        $scope.showAddSaleAgent = false;

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

        if (!groupExists) {
            $scope.saleAgentGroups.push({
                "propertyID": $scope.selectedProperty,
                "groupName": saleAgentDetails.groupName
            });
        }

        $scope.saleAgentDetails.push({
            "propertyID": $scope.selectedProperty,
            "company": $("#editSaleAgentCompany").val(),
            "fullName": $("#editSaleAgentfullName").val(),
            "cellNumber": $("#editSaleAgentCellNumber").val(),
            "email": $("#editSaleAgentEmail").val(),
            "valuation": $("#editSaleAgentValuation").val(),
            "valuationDate": $("#editSaleAgentValuationDate").val()
        });
        $scope.PD = {};


        swal("Great work!", "You have edited this saleAgent!", "success");
        $scope.showEditSaleAgent = false;
        $("#editSaleAgentCompany").val("");
        $("#editSaleAgentfullName").val("");
        $("#editSaleAgentCellNumber").val("");
        $("#editSaleAgentEmail").val("");
        $("#editSaleAgentValuation").val("");
        $("#editSaleAgentValuationDate").val("");
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

            $("#editSaleAgentCompany").val($scope.selectedSaleAgent.company);
            $("#editSaleAgentfullName").val($scope.selectedSaleAgent.fullName);
            $("#editSaleAgentCellNumber").val($scope.selectedSaleAgent.cellNumber);
            $("#editSaleAgentEmail").val($scope.selectedSaleAgent.email);
            $("#editSaleAgentValuation").val($scope.selectedSaleAgent.valuation);
            $("#editSaleAgentValuationDate").val($scope.selectedSaleAgent.valuationDate);

            $scope.toggleEditSaleAgent();
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

    $scope.getTotalSaleAgentCost = function(groupName) {
        var total = 0;

        if (groupName == "") {
            angular.forEach($scope.saleAgentDetails, function(selected) {
                total += selected.cost * selected.quantity;
            });


        } else {
            angular.forEach($scope.saleAgentDetails, function(selected) {
                if (selected.groupName == groupName) {
                    total += selected.cost * selected.quantity;
                }

            });
        }

        return total;
    };

    $scope.toggleAddSaleAgent = function() {

        $scope.showAddSaleAgent = !$scope.showAddSaleAgent;
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
            "tentantFullName": $("#addRentTentantName").val(),
            "invoiceDate": rentDetails.invoiceDate,
            "invoiceAmount": rentDetails.invoiceAmount,
            "proofOfPaymentDate": rentDetails.proofOfPaymentDate,
            "proofOfPaymentAmount": rentDetails.proofOfPaymentAmount
        });
        $scope.PD = {};

        swal("Great work!", "You have added a rent for this property!", "success")
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
            "tentantFullName": $("#editRentTentantName").val(),
            "invoiceDate": $("#editRentInvoiceDate").val(),
            "invoiceAmount": $("#editRentInvoiceAmount").val(),
            "proofOfPaymentDate": $("#editRentProofOfPaymentDate").val(),
            "proofOfPaymentAmount": $("#editRentProofOfPaymentAmount").val()
        });
        $scope.PD = {};


        swal("Great work!", "You have edited this rent!", "success");
        $scope.showEditRent = false;
        $("#editRentTentantName").val("");
        $("#editRentInvoiceDate").val("");
        $("#editRentInvoiceAmount").val("");
        $("#editRentProofOfPaymentDate").val("");
        $("#editRentProofOfPaymentAmount").val("");
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

function insertQuickExpenses() {
    $("#expenseInformationTextarea").val("");

    var expenses = "";

    for (var i = 1; i <= 6; i++) {
        if ($("#expenseCheckBox" + i).is(':checked')) {
            expenses += "" + $("#expenseCheckBox" + i).val() + " 100.00 1\n";
        }
    }

    expenses = expenses.substring(0, expenses.length - 1);

    $("#expenseInformationTextarea").val(expenses);
    $("#expenseInformationLabel").addClass("active");
    $('#expenseInformationTextarea').trigger('autoresize');
}

function insertQuickRenovations() {
    $("#renovationInformationTextarea").val("");

    var renovations = "";

    for (var i = 1; i <= 55; i++) {
        if ($("#renovationCheckBox" + i).is(':checked')) {
            renovations += "" + $("#renovationCheckBox" + i).val() + " 100.00 1\n";
        }
    }

    renovations = renovations.substring(0, renovations.length - 1);

    $("#renovationInformationTextarea").val(renovations);
    $("#renovationInformationLabel").addClass("active");
    $('#renovationInformationTextarea').trigger('autoresize');
}

function insertQuickTentant() {
    $("#addRentTentantName").val("");

    var name = "";

    for (var i = 1; i <= 55; i++) {
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
