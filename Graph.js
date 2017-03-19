// Graph constructor
function Graph(data) {
    this.vertices = [];
    this.edges = []; // array of other graphs
    this.numberOfEdges = 0;
}

Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
};

Graph.prototype.addEdge = function (v1, v2) {
    this.edges[v1].push(v2);
    this.edges[v2].push(v1);
    this.numberOfEdges++;
}

