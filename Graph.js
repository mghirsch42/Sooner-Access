// Define a location as having a latitude and a longitude
function Location(lat, lng) {
    this.lat = lat;
    this.lng = lng;
}
Location.prototype.toString = function() {
    var result = "(" + this.lat + ", " + this.lng + ")";
    return result;
}

// Graph constructor
function Graph() {
    this.vertices = [];     // Array of locations
    this.edges = new Map(); // Map of Location -> Location
}

// add a vertex to the graph
// assume location passes is not already in our graph
Graph.prototype.addVertex = function(loc) {
    this.vertices.push(loc);
    this.edges.set(loc, []);
};

// add an edge to the graph
Graph.prototype.addEdge = function (p1, p2) {
    // if both locations are already vertices
    if(this.vertices.includes(p1) && this.vertices.includes(p2)) {
        this.edges.get(p1).push(p2);
        this.edges.get(p2).push(p1);
    }
};

// returns the points composing the shortest path
Graph.prototype.bfs = function shortestPath(source, target) {
    if (source == target) {   // Delete these four lines if
        console.log(source);          // you want to look for a cycle
        return;                 // when the source is equal to
    }                         // the target.
    
    var queue = [ source ],
        visited = new Map(),
        predecessor = new Map(),
        tail = 0;
    visited.set(source ,true);
    
    while (tail < queue.length) {
        var u = queue[tail++],  // Pop a vertex off the queue.
            neighbors = this.edges.get(u);
        for (var i = 0; i < neighbors.length; ++i) {
            
            var v = neighbors[i];
            if (!visited.get(v)) {
                visited.set(v, true);
                if (v === target) {   // Check if the path is complete.
                    console.log("Predecessors: " + predecessor);
                    var path = [ v ];   // If so, backtrack through the path.
                    path.push(u);
                    while (u !== source) {
                        u = predecessor.get(u);
                        path.push(u);
                    }
                    path.reverse();
                    return path.join(', ');
                    return;
                }
                predecessor.set(v, u);
                queue.push(v);
            }
        }
    }
    console.log('there is no path from ' + source + ' to ' + target);
}

// given a location, return the closest location contained in vertices
Graph.prototype.getClosestVertex = function(source) {
    var best = new Location(this.vertices[0].lat, this.vertices[0].lng);
    this.vertices.forEach(function (loc) {
        if(Math.abs(loc.lat - source.lat) < Math.abs(best.lat - source.lat)) {
            if(Math.abs(loc.lng - source.lng) < Math.abs(best.lng - source.lng)) {
                best = loc;
            }
        }
    })
    return best;
}
