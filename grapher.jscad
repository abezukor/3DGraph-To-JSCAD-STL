// These are the parameters
var xMin = 1; // min x value to plot
var yMin = 1; // min y value to plot
var xMax = 5; // max x value to plot
var yMax = 5; // max y value to plot
var xStep = 0.125; //x step distance
var yStep =  0.125; // y step distance

//This is where you can define the function you want to plot. Any javascript expression should work.
/**
 * Returns z of the desired function for a givin x and y value.
 * @param {float} x - The x value
 * @param {float} y - the y value
 */
function graphFunction(x,y){
    return (x/(y));
}

///You Should not have to edit anything below here
var xLen = ((xMax-xMin)/xStep)+1; //gets the length of the x and y arrays
var yLen = ((yMax-yMin)/yStep)+1;

//find the index of a point in an array givin the x and Y coordinates
function findPoint(x,y){
    return parseInt(parseInt((x-xMin)/xStep)*yLen+parseInt((y-yMin)/yStep));
}


function main (){
    var points = []; //makes the points array
    var faces = []; // makes the faces array
    //Adjusts xMax and yMax so strictly less than signs work
    xMax+=xStep;
    yMax+=yStep;
    
    // sets up some variables
    var zMin = 0;

    //makes to the points of the graph
    for(x=xMin;x<xMax;x+=xStep){
        for(y=yMin;y<yMax;y+=yStep){
            points.push([x,y,graphFunction(x,y)]);
            if(graphFunction(x,y)<zMin){
                zMin = graphFunction(x,y);
            }
        }
    }

    // makes the side points     
    for(x=xMin;x<xMax;x+=xStep){
        points.push([x,yMin,zMin]);
    }
    
    for(y=yMin;y<yMax;y+=yStep){
        points.push([xMin,y,zMin]);
    }
    
    for(x=xMin;x<xMax;x+=xStep){
        points.push([x,yMax-yStep,zMin]);
    }
    
    for(y=yMin;y<yMax;y+=yStep){
        points.push([xMax-xStep,y,zMin]);
    }

    //makes the faces of the graph
    for(x=xMin;x<xMax-xStep;x+=xStep){
        for(y=yMin;y<yMax-yStep;y+=yStep){
            faces.push([parseInt(findPoint(x+xStep,y)),parseInt(findPoint(x,y)),parseInt(findPoint(x+xStep,y+yStep))]);
            faces.push([parseInt(findPoint(x,y)),parseInt(findPoint(x,y+yStep)),parseInt(findPoint(x+xStep,y+yStep))]);
        }
    }
    
    // makes the side faces
    var pos = 0;
    var numPoints = points.length;

    for(x=xMin;x<xMax-xStep;x+=xStep){// xMin to xMax at yMin
        pos = parseInt((x-xMin)/xStep);
        faces.push([parseInt(pos+(numPoints-2*xLen-2*yLen)),parseInt(findPoint(x,yMin)),parseInt(findPoint(x+xStep,yMin))]);
        faces.push([parseInt(pos+(numPoints-2*xLen-2*yLen)+1),parseInt(pos+(numPoints-2*xLen-2*yLen)),parseInt(findPoint(x+xStep,yMin))]);
    }

    for(x=xMin;x<xMax-xStep;x+=xStep){ // xMin to xMax at yMax
        pos = parseInt((x-xMin)/xStep);
        faces.push([parseInt(findPoint(x,yMax-yStep)),parseInt(pos+(numPoints-xLen-yLen)),parseInt(findPoint(x+xStep,yMax-yStep))]);
        faces.push([parseInt(pos+(numPoints-xLen-yLen)),parseInt(pos+(numPoints-xLen-yLen)+1),parseInt(findPoint(x+xStep,yMax-yStep))]);
    }

    for(y=yMin;y<yMax-yStep;y+=yStep){// ymin to yMax at xMin
        pos = parseInt((y-yMin)/yStep);
        faces.push([parseInt(findPoint(xMin,y)),parseInt(pos+(numPoints-xLen-2*yLen)),parseInt(findPoint(xMin,y+yStep))]);
        faces.push([parseInt(pos+(numPoints-xLen-2*yLen)),parseInt(pos+(numPoints-xLen-2*yLen)+1),parseInt(findPoint(xMin,y+yStep))]);
    }

    for(y=yMin;y<yMax-yStep;y+=yStep){//ymin to yMax at xMax
        pos = parseInt((y-yMin)/yStep);
        faces.push([parseInt(pos+(numPoints-yLen)),parseInt(findPoint(xMax-xStep,y)),parseInt(findPoint(xMax-xStep,y+yStep))]);
        faces.push([parseInt(pos+(numPoints-yLen)+1),parseInt(pos+(numPoints-yLen)),parseInt(findPoint(xMax-xStep,y+yStep))]);
    }

    //This adds the bottom faces
    faces.push([numPoints-2*xLen-2*yLen,numPoints-xLen-2*yLen-1,numPoints-1]);
    faces.push([numPoints-xLen-yLen,numPoints-2*xLen-2*yLen,numPoints-1]);
    
    //returns a polygon from points and faces
    return polyhedron({
            points: points,
            polygons: faces
               });
}