
var base = 'http://clicktime.herokuapp.com:80/rooms/';

var roomName = 'Art-cell';    // Replaced with my own room name


 var drawCanvas = function() {

  var drawApp = {};
  /*
  	Init 
  */
    //Initiate a function using using the drawApp object
    drawApp.init = function() {

    //Creating an canvas element and store in the canvas property of the drawApp object  
    drawApp.canvas = document.createElement('canvas');

    //Set the width of the canvas
    drawApp.canvas.width = 1000;
    
    //Set the height of the canvas
    drawApp.canvas.height = 800;

    //Now setting the defined canvas inside the article tag in the html page  
    document.getElementsByTagName('article')[0].appendChild(drawApp.canvas);

    //The HTMLCanvasElement.getContext() method returns a drawing context on the canvas
    drawApp.context = drawApp.canvas.getContext("2d");

    //Sets or returns the color, gradient, or pattern used to fill the drawing
    drawApp.context.fillStyle = "solid";

/*
    function getRandomColor() 
    {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    } 

*/
    //Sets or returns the color, gradient, or pattern used for strokes
    drawApp.context.strokeStyle = '#'+Math.random().toString(16).substr(-6);;

    //Sets or returns the current line width
    drawApp.context.lineWidth = 11;

    //Sets or returns the style of the end caps for a line
    drawApp.context.lineCap = "round|square";

    //drawApp.socket = io.connect('http://localhost:4000');

    drawApp.socket = io.connect(base+roomName);



    drawApp.socket.on('message', function(data) 
    {

      return drawApp.draw(data.x, data.y, data.type);

    });


    drawApp.draw = function(x, y, type) 
    {

      if (type === "dragstart") 
      {
        drawApp.context.beginPath();

        return drawApp.context.moveTo(x, y);

      } 

      else if (type === "drag") 

      {
        drawApp.context.lineTo(x, y);
        return drawApp.context.stroke();
      } 

      else 

      {
        return drawApp.context.closePath();
      }

    };//Draw function ends here

}; //First function ends here


  /*
  	Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(data) 
  {
    var offset, type, x, y;

    type = data.handleObj.type;

    offset = $(this).offset();

    data.offsetX = data.layerX - offset.left;

    data.offsetY = data.layerY - offset.top;

    //x = data.offsetX; //Only working in Mozilla
    //y = data.offsetY;  //Only Working in Mozilla

    x = data.layerX;    //Working in Chrome
    y = data.layerY;   //Working in Chrome

    //Calling the draw function here
    drawApp.draw(x, y, type);
  
    //This line of code will broadcast the message to everyone connected to the ser
    drawApp.socket.emit('message', { x: x, y: y, type: type });

  });

  $(function() 
  {
    
    return drawApp.init();

  });


}


window.onLoad(drawCanvas.call(this));

