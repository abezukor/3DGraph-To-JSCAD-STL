# 3D Graph to JSCAD Or STL
This is a program that allows you to make a 3d graph via [OpenJSCAD](https://openjscad.org/) and JavaScript. This can be useful if you want to 3d print these graphs because OpenJSCAD can easily export to an STL.

## How can I use it?
To make a 3d graph you don’t even have to leave your browser! Simply Follow these instructions to make your printable 3D Graph.

1. Copy the code in [grapher.jscad](grapher.jscad) or download the zip file of this repo.
2. Go to [https://openjscad.org/](https://openjscad.org/).
3. Past the code you copied into the box or upload grapher.jscad from the download.
4. Set up your graphs parameters in these lines of code. They are self-explanatory. 
```javascript
var xMin = 1; // min x value to plot
var yMin = 1; // min y value to plot
var xMax = 5; // max x value to plot
var yMax = 5; // max y value to plot
var xStep = 0.125; //x step distance
var yStep =  0.125; // y step distance
```
\
5. Fill in the function you want to graph in ```graphFunction(x,y)```. You have full access to any javascript function. Make shore to return the z value. For instance if you wanted to plot z=x/y the ```graphFunction(x,y)``` would be:
```javascript
// this is where you can define the function you want to plot. Any javascript expression should work.
/**
 * Returns z of the desired function for a given x and y value.
 * @param {float} x - The x value
 * @param {float} y - the y value
 */
function graphFunction(x,y){
    return (x/y);
}
```
6. Hit F5 to render your graph.
7. If you want to 3D print the graph click the "Generate STL" button at the bottom-left corner of the OpenJSCAD window.
8. Congratulations. You are done.

## License

Licensed under the [GPL license](LICENSE).
