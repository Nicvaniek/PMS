var app = angular.module("propertyInvestor", []);
app.controller("propertyController", ["$scope", function($scope) {
    $scope.propertyDetails = [];
    $scope.expenseDetails = [];


    $scope.addPropertyForm = false;
    $scope.viewProperty = false;
    $scope.editProperty = false;

    $scope.selectedProperty = "EMPTY";
    $scope.numberOfproperties = 0;
    $scope.numberOfpropertiesCAP = 2;


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
        $("#numberOfpropertiesNavBar").text($scope.numberOfproperties + " Properties");
        $scope.toggleAddProprty();
        swal("Great work!", "You have added a property!", "success")
    };

    $scope.editPropertyF = function() {
        $scope.editProperty = true;
        $scope.viewProperty = false;
    }

    $scope.track = function() {
        $scope.expenseDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": "Gardening",
            "cost": "R600",
            "quantity": "1",
            "occurrence": "Weekly",
            "paidTo": "Mr Smith",
            "invoiceDate": "29-05-2017"
        });
        $scope.PD = {};

        swal("Great work!", "This expense has been tracked", "success")
    }

    $scope.editPropertyConfirm = function(propertyDetails) {

        var count = 0;

        angular.forEach($scope.propertyDetails, function(selected) {
            if (selected.houseNumber == $scope.selectedProperty) {
                $scope.propertyDetails[count]["houseNumber"] = propertyDetails.houseNumber;
                $scope.propertyDetails[count]["occupant"] = propertyDetails.occupant;
                $scope.propertyDetails[count]["type"] = propertyDetails.type;
                $scope.propertyDetails[count]["houseNumber"] = propertyDetails.houseNumber;
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

    $scope.addNewExpense = function(expenseDetails) {
        $scope.expenseDetails.push({
            "propertyID": $scope.selectedProperty,
            "description": expenseDetails.description,
            "cost": expenseDetails.cost,
            "quantity": expenseDetails.quantity,
            "occurrence": expenseDetails.occurrence,
            "paidTo": expenseDetails.paidTo,
            "invoiceDate": expenseDetails.invoiceDate
        });
        $scope.PD = {};

        swal("Great work!", "You have added an expense for this property!", "success")
    };

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

    $scope.deleteExpense = function() {

        var expenseToDelete = "";
        angular.forEach($scope.expenseDetails, function(selected) {

                    if ($("#" + selected.description + "radio").is(':checked')) {
                        expenseToDelete = selected.description;
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
                    if (selected.description != expenseToDelete) {
                        alert("HI");
                        newDataList.push(selected);
                    }
                });
                $scope.expenseDetails = newDataList;
                $scope.$apply();
                swal("Deleted!", "Your expense has been deleted.", "success");
            });
        }
        else
        {
            swal({
                title: "Error",
                text: "Please select an expense to delete.",
                type: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d32f2f"
            });

        }

    };

    $scope.toggleAddProprty = function() {
        $scope.addPropertyForm = !$scope.addPropertyForm;
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

}]);

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
