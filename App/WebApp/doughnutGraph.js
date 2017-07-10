function DoughnutGraph() {

    this.config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [],
                backgroundColor: [],
                label: 'Dataset 1'
            }],
            labels: []
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: ''
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    }

    this.colorNames = Object.keys(window.chartColors);
}

DoughnutGraph.prototype.init = function(id) {
    var ctx = document.getElementById(id).getContext("2d");
    this.doughnut = new Chart(ctx, this.config);
    this.doughnut.update();

}

DoughnutGraph.prototype.destroy = function() {
    this.doughnut.destroy();
}

DoughnutGraph.prototype.update = function(date) {
    this.doughnut.update();
}

DoughnutGraph.prototype.reset = function(date) {
    for (var i = this.config.data.datasets[0].data.length - 1; i >= 0; i--) {
        this.config.data.datasets[0].data.pop();
    }

    for (var i = this.config.data.datasets[0].backgroundColor.length - 1; i >= 0; i--) {
        this.config.data.datasets[0].backgroundColor.pop();
    }

    for (var i = this.config.data.labels.length - 1; i >= 0; i--) {
        this.config.data.labels.pop();
    }

    this.doughnut.update();
}

DoughnutGraph.prototype.addData = function(label, amount) {
    this.doughnut.update();

    // We check if the label exsists 
    var exsistingLabelIndex = -1;
    var count = 0;
    this.config.data.labels.forEach(function(exsistingLabel) {
        if (exsistingLabel == label) {
            exsistingLabelIndex = count;
        }
        count++;
    });

    // If the label exists 
    if (exsistingLabelIndex != -1) {
        count = 0;
        var newData = [];
        this.config.data.datasets[0].data.forEach(function(data) {

            if (count == exsistingLabelIndex) {
                data = data + amount;
                newData.push(data);
            } else {
                newData.push(data);
            }
        });
        this.config.data.datasets[0].data = newData;

    } else { // It doesnt exist 

        this.config.data.labels.push(label);
        var colorName = this.colorNames[this.config.data.datasets[0].data.length % this.colorNames.length];
        var newColor = window.chartColors[colorName];

        this.config.data.datasets.forEach(function(dataset) {
            dataset.data.push(amount);
            dataset.backgroundColor.push(newColor);
        });
    }

    this.doughnut.update();

};

DoughnutGraph.prototype.removeData = function(label, amount) {
    this.doughnut.update();

    // We check if the label exsists 
    var exsistingLabelIndex = -1;
    var count = 0;
    this.config.data.labels.forEach(function(exsistingLabel) {
        if (exsistingLabel == label) {
            exsistingLabelIndex = count;
        }
        count++;
    });

    // If the label exists 
    if (exsistingLabelIndex != -1) {

        // We also check if the amount we need to delete is the whole amount 
        count = 0;
        var check = false; // true means full delete, false just subtract the amount
        this.config.data.datasets[0].data.forEach(function(data) {

            if (count == exsistingLabelIndex) {
                check = data - amount == 0;
            }
        });

        if (check) { //Full Delete
            // We remove the data
            count = 0;
            var newData = [];
            this.config.data.datasets[0].data.forEach(function(data) {

                if (count != exsistingLabelIndex) {
                    newData.push(data);
                }
            });
            this.config.data.datasets[0].data = newData;

            // We remove the color
            count = 0;
            var newColors = [];
            this.config.data.datasets[0].backgroundColor.forEach(function(color) {

                if (count != exsistingLabelIndex) {
                    newColors.push(color);
                }
            });
            this.config.data.datasets[0].backgroundColor = newColors;

            // We remove the label
            count = 0;
            var newLabels = [];
            this.config.data.labels.forEach(function(exsistingLabel) {

                if (count != exsistingLabelIndex) {
                    newLabels.push(exsistingLabel);
                }
            });
            this.config.data.labels = newLabels;
        } else { // Just subtract the amount
            count = 0;
            var newData = [];
            this.config.data.datasets[0].data.forEach(function(data) {

                if (count == exsistingLabelIndex) {
                    data = data - amount;
                    newData.push(data);
                } else {
                    newData.push(data);
                }
            });
            this.config.data.datasets[0].data = newData;
        }

    }
    this.doughnut.update();
};
