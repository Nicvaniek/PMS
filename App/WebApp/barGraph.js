function BarGraph() {
    this.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.color = Chart.helpers.color;
    this.colorNames = Object.keys(window.chartColors);
    this.barChartData = {
        labels: [],
        datasets: []
    };
}

BarGraph.prototype.init = function(id) {
    var ctx = document.getElementById(id + "").getContext("2d");
    this.barGraph = new Chart(ctx, {
        type: 'bar',
        data: this.barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: ''
            }
        }
    });

    var today = new Date();
    var currentMonth = today.getMonth(); //January is 0!
    var currentYear = parseInt((today.getFullYear() + "").substring(2, 4));

    var newLabels = [];

    for (var j = currentMonth + 2; j < 12; j++) {
        newLabels.push(this.MONTHS[j] + " '" + (currentYear - 1));

    }

    for (var j = 0; j < currentMonth + 2; j++) {
        newLabels.push(this.MONTHS[j] + " '" + currentYear);
    }

    this.barChartData.labels = newLabels;
}

//////////////////////////////////////////////

BarGraph.prototype.findLabelIndex = function(label) {
    var count = 0;
    var labelIndex = -1;
    this.barChartData.labels.forEach(function(exsistingLabel) {
        if (label == exsistingLabel) {
            labelIndex = count;
        }
        count++;
    });
    return labelIndex;
}

BarGraph.prototype.findDatasetIndex = function(label) {

    var count = 0;
    var labelIndex = -1;
    this.barChartData.datasets.forEach(function(dataset) {
        if (dataset.label == label) {
            labelIndex = count;
        }
        count++;
    });
    return labelIndex;
}

BarGraph.prototype.getMonth = function(date) {
    date = date.substring(5, 7);
    return this.MONTHS[parseInt(date) - 1];

}

BarGraph.prototype.getYear = function(date) {
    return date.substring(2, 4);
}

BarGraph.prototype.update = function(date) {
    this.barGraph.update();
}

BarGraph.prototype.createLines = function() {
    var duplicateDatasets = [];

    this.barChartData.datasets.forEach(function(dataset) {
        var duplicateDataset = [];
        duplicateDataset.backgroundColor = dataset.backgroundColor;
        duplicateDataset.borderColor = dataset.borderColor;
        duplicateDataset.data = dataset.data;
        duplicateDataset.label = dataset.label + " Line";
        duplicateDataset.type = "line";

        duplicateDatasets.push(duplicateDataset);
    });

    for (var i = duplicateDatasets.length - 1; i >= 0; i--) {
        this.barChartData.datasets.push(duplicateDatasets[i]);
    }
    this.barGraph.update();

}

BarGraph.prototype.removeLines = function() {
    var newDatasets = [];

    this.barChartData.datasets.forEach(function(dataset) {
        if (dataset.type != "line") {
            newDatasets.push(dataset);

        }
    });
    this.barChartData.datasets = [];
    for (var i = newDatasets.length - 1; i >= 0; i--) {
        this.barChartData.datasets.push(newDatasets[i]);
    }
    this.barGraph.update();
}

BarGraph.prototype.reset = function() {
    for (var i = this.barChartData.labels.length - 1; i >= 0; i--) {
        this.barChartData.labels.pop();
    }
    for (var i = this.barChartData.datasets.length - 1; i >= 0; i--) {
        this.barChartData.datasets.pop();
    }

    this.barGraph.update();
}

BarGraph.prototype.destroy = function() {
    this.barGraph.destroy();
}
//////////////////////////////////////////////

BarGraph.prototype.addDataset = function(dataLabel, date, amount) {
    var colorName = this.colorNames[this.barChartData.datasets.length % this.colorNames.length];;
    var dsColor = window.chartColors[colorName];
    var newDataset = {
        label: dataLabel,
        backgroundColor: this.color(dsColor).alpha(0.5).rgbString(),
        borderColor: dsColor,
        borderWidth: 1,
        data: []
    };

    var labelIndex = this.findLabelIndex(this.getMonth(date) + " '" + this.getYear(date));
    if (labelIndex == -1) {
        return false;
    } else{
        for (var index = 0; index < this.barChartData.labels.length; ++index) {
            if (index == labelIndex) {
                newDataset.data.push(amount);
            } else {
                newDataset.data.push(0);
            }
        }

        this.barChartData.datasets.push(newDataset);
        this.barGraph.update();
    this.createLines();

        return true;

    }
};

BarGraph.prototype.addData = function(dataLabel, date, amount) {
    this.removeLines();
    var datasetIndex = this.findDatasetIndex(dataLabel);
    if (datasetIndex == -1) {
        return this.addDataset(dataLabel, date, amount);
    } else {
        if (this.barChartData.datasets.length > 0) {
            labelIndex = this.findLabelIndex(this.getMonth(date) + " '" + this.getYear(date));

            if (labelIndex == -1) {
                return false;
            }

            var newData = [];
            var count = 0;
            this.barChartData.datasets[datasetIndex].data[labelIndex] += amount;

            this.barGraph.update();
        }
    }
    this.createLines();
    return true;
};

BarGraph.prototype.removeData = function(dataLabel, date, amount) {
    this.removeLines();

    var datasetIndex = this.findDatasetIndex(dataLabel);
    if (this.barChartData.datasets.length > 0) {
        labelIndex = this.findLabelIndex(this.getMonth(date) + " '" + this.getYear(date));

        if (labelIndex == -1) {
            return;
        }

        var newData = [];
        var count = 0;
        this.barChartData.datasets[datasetIndex].data[labelIndex] -= amount;

        var sum = 0;
        this.barChartData.datasets[datasetIndex].data.forEach(function(data) {
            sum += data;
        });

        if (sum == 0) {
            this.removeDataset(dataLabel);
        }
        this.barGraph.update();
    }
    this.createLines();

};

BarGraph.prototype.removeDataset = function(dataLabel) {
    var newDatasets = [];

    this.barChartData.datasets.forEach(function(dataset, datasetIndex) {
        if (dataset.label != dataLabel) {
            newDatasets.push(dataset);
        }
    });

    this.barChartData.datasets = newDatasets;

    this.barGraph.update();
};

BarGraph.prototype.setLabels = function(dataLabels) {
    // Restet the data 
    this.barChartData.datasets = [];

    this.barChartData.labels = [];

    for (var i = dataLabels.length - 1; i >= 0; i--) {
        this.barChartData.labels.push(dataLabels[i]);
    }

    this.barGraph.update();
};
