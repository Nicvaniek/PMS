function CustomBarGraph() {
    this.color = Chart.helpers.color;
    this.colorNames = Object.keys(window.chartColors);
    this.barChartData = {
        labels: [],
        datasets: []
    };
}

CustomBarGraph.prototype.init = function(id) {
    var ctx = document.getElementById(id + "").getContext("2d");
    window.myBar = new Chart(ctx, {
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
}

//////////////////////////////////////////////

CustomBarGraph.prototype.findLabelIndex = function(label) {
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

CustomBarGraph.prototype.findDatasetIndex = function(label) {

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

CustomBarGraph.prototype.update = function(date) {
    window.myBar.update();

}

CustomBarGraph.prototype.createLines = function() {
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
    window.myBar.update();

}

CustomBarGraph.prototype.removeLines = function() {
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
    window.myBar.update();
}

//////////////////////////////////////////////
CustomBarGraph.prototype.addDataset = function(dataLabel, name, amount) {
    var colorName = this.colorNames[this.barChartData.datasets.length % this.colorNames.length];;
    var dsColor = window.chartColors[colorName];
    var newDataset = {
        label: dataLabel,
        backgroundColor: this.color(dsColor).alpha(0.5).rgbString(),
        borderColor: dsColor,
        borderWidth: 1,
        data: []
    };

    var labelIndex = this.findLabelIndex(name);
    if (labelIndex == -1) {
        return false;
    } else {
        for (var index = 0; index < this.barChartData.labels.length; ++index) {
            if (index == labelIndex) {
                newDataset.data.push(amount);
            } else {
                newDataset.data.push(0);
            }
        }

        this.barChartData.datasets.push(newDataset);
        window.myBar.update();
        

        return true;

    }
};

CustomBarGraph.prototype.addData = function(dataLabel, name, amount) {
    
    var datasetIndex = this.findDatasetIndex(dataLabel);
    if (datasetIndex == -1) {
        return this.addDataset(dataLabel, name, amount);
    } else {
        if (this.barChartData.datasets.length > 0) {
            labelIndex = this.findLabelIndex(name);

            if (labelIndex == -1) {
                return false;
            }

            var newData = [];
            var count = 0;
            this.barChartData.datasets[datasetIndex].data[labelIndex] += amount;

            window.myBar.update();
        }
    }
    
    return true;
};

CustomBarGraph.prototype.removeData = function(dataLabel, name, amount) {
    
    var datasetIndex = this.findDatasetIndex(dataLabel);
    if (this.barChartData.datasets.length > 0) {
        var labelIndex = this.findLabelIndex(name);

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
        window.myBar.update();
    }
    

};

CustomBarGraph.prototype.removeDataset = function(dataLabel) {
    var newDatasets = [];

    this.barChartData.datasets.forEach(function(dataset, datasetIndex) {
        if (dataset.label != dataLabel) {
            newDatasets.push(dataset);
        }
    });

    this.barChartData.datasets = newDatasets;

     var newLabels = [];

    this.barChartData.labels.forEach(function(label) {
        if (label != dataLabel) {
            newLabels.push(label);
        }
    });

    this.barChartData.labels = newLabels;

    window.myBar.update();
};

CustomBarGraph.prototype.setLabels = function(dataLabels) {
    this.barChartData.labels = [];

    for (var i = dataLabels.length - 1; i >= 0; i--) {
        this.barChartData.labels.push(dataLabels[i]);
    }

    window.myBar.update();
};

CustomBarGraph.prototype.getLabels = function(dataLabels) {
    return this.barChartData.labels;
};
