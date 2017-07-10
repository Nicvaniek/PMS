var ExpenseDoughnutGraph = new Object();
function ExpenseDoughnutGraph() {
}
ExpenseDoughnutGraph.config = {
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
            display: true,
            text: 'Chart.js Doughnut Chart'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};

ExpenseDoughnutGraph.onload = function() {
    var ctx = document.getElementById("myChart").getContext("2d");
    ExpenseDoughnutGraph.expenseDoughnut = new Chart(ctx, config);
};

var colorNames = Object.keys(window.chartColors);

ExpenseDoughnutGraph.addData = function(label, amount) {

    //if (config.data.datasets.length == 0) {
    config.data.labels.push(label);

    var colorName = colorNames[0];
    var newColor = window.chartColors[colorName];

    dataset.data.push(amount);
    dataset.backgroundColor.push(newColor);


    window.expenseDoughnut.update();
    //}

    /* config.data.datasets.forEach(function(dataset) {
         dataset.data.push(randomScalingFactor());
         dataset.backgroundColor.push(newColor);
     });

     if (config.data.datasets.length > 0) {
         config.data.labels.push('data #' + config.data.labels.length);

         var colorName = colorNames[config.data.datasets[0].data.length % colorNames.length];;
         var newColor = window.chartColors[colorName];

         config.data.datasets.forEach(function(dataset) {
             dataset.data.push(randomScalingFactor());
             dataset.backgroundColor.push(newColor);
         });

         window.expenseDoughnut.update();
     }*/
};
ExpenseDoughnutGraph.removeData = function() {
    config.data.labels.splice(-1, 1); // remove the label first

    config.data.datasets.forEach(function(dataset) {
        dataset.data.pop();
        dataset.backgroundColor.pop();
    });

    window.expenseDoughnut.update();
};
