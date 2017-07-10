function CustomGraphManager(doughnutGraphID, barGraphID) {
    
    this.doughnutGraph = new DoughnutGraph();
    this.doughnutGraph.init(doughnutGraphID);
    this.barGraph = new CustomBarGraph();
    this.barGraph.init(barGraphID);
}

CustomGraphManager.prototype.addData = function(description, name, amount) {
    var labels = this.barGraph.getLabels();
    labels.push(name);
    this.barGraph.setLabels(labels);

    this.doughnutGraph.addData(description, amount);
    this.barGraph.addData(description, name, amount);

}

CustomGraphManager.prototype.removeData = function(description, name, amount) {
    this.doughnutGraph.removeData(description, amount);
    this.barGraph.removeData(description, name, amount);
}


