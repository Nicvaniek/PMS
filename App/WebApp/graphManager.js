function GraphManager(doughnutGraphID, barGraphID) {
    this.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.doughnutGraph = new DoughnutGraph();
    this.doughnutGraph.init(doughnutGraphID);
    this.barGraph = new BarGraph();
    this.barGraph.init(barGraphID);


    this.barGraphID = barGraphID;
    this.doughnutGraphID = doughnutGraphID;

   /* var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today

    this.endDate = yyyy + '-' + mm + '-' + dd;
    this.beginingDate = (yyyy - 1) + '-' + mm + '-' + dd;*/
    this.endDate = "2018-01-01";
    this.beginingDate = "2017-03-31";
}


GraphManager.prototype.getMonth = function(date) {
    return date.substring(5, 7);
}

GraphManager.prototype.getYear = function(date) {
    return date.substring(2, 4);
}

GraphManager.prototype.getWholeYear = function(date) {
    return date.substring(0, 4);
}

GraphManager.prototype.reset = function() {

    this.doughnutGraph.destroy();
    this.doughnutGraph = new DoughnutGraph();
    this.doughnutGraph.init(this.doughnutGraphID + "");

    this.barGraph.destroy();
    this.barGraph = new BarGraph();
    this.barGraph.init(this.barGraphID + "");
}

GraphManager.prototype.setRange = function(beginingDate, endDate, data) {
    this.reset();
    this.endDate = endDate;
    this.beginingDate = beginingDate;
    // get the number of months between the years

    var range = (parseInt(this.getWholeYear(endDate)) - parseInt(this.getWholeYear(beginingDate))) * 12;


    if (this.getMonth(beginingDate) > this.getMonth(endDate)) {
        range -= (this.getMonth(beginingDate) - this.getMonth(endDate))
    } else {
        range += (this.getMonth(beginingDate) - this.getMonth(endDate))
    }

    if (range < 0) {
        range *= -1;
    }


    var count = parseInt(this.getMonth(beginingDate));
    var year = parseInt(this.getYear(beginingDate));
    var labels = [];
    for (var i = range - 1; i >= 0; i--) {
        if (count % 11 == 0) {
            count = 0;
            year++;
        }

        if (year >= 100) {
            year = 00;
        }
        labels.push(this.MONTHS[count] + " '" + year);
        count++;
    }

    var reverseLabels = [];
    for (var i = range - 1; i >= 0; i--) {
        reverseLabels.push(labels.pop());
    }

    this.barGraph.setLabels(reverseLabels);

    for (var i = data.length - 1; i >= 0; i--) {
        //this.barGraph.addData(data[i].description, data[i].invoiceDate, data[i].quantity * data[i].cost)
        if (this.barGraph.addData(data[i].description, data[i].invoiceDate, data[i].quantity * data[i].cost)) {
            this.doughnutGraph.addData(data[i].description, data[i].quantity * data[i].cost);
        }
    }

}

GraphManager.prototype.addData = function(description, date, amount, data) {
    //this.doughnutGraph.addData(description, amount);
    //this.barGraph.addData(description, date, amount);
    this.update();
}

GraphManager.prototype.removeData = function(description, date, amount, data) {
    //this.doughnutGraph.removeData(description, amount);
    //this.barGraph.removeData(description, date, amount);
    this.update();
}

GraphManager.prototype.update = function(data) {
    this.setRange(this.beginingDate, this.endDate, data)
    this.doughnutGraph.update();
    this.barGraph.update();
}
