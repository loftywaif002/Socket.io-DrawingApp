var server = function() 

{
  var io = require('socket.io').listen(4000);

  //var io = require('socket.io')();

  io.sockets.on('connection', function(socket) 
  {
    //socket.on('drawClick', function(data) 
     socket.on('message', function(data) 
    {
      
      socket.emit('draw', { x: data.x, y: data.y, type: data.type });

    });

  });

}

server.call(this);//Call the function defined
