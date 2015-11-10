
var oDatabaseMgr;
var oAudioController;
var oLocationElementCreator;
var oInterfaceMgr;

// ------ //

var audioPlayerClicked = function( index ) {
  console.log(">> audioPlayerClicked( " + index + ")!!!");
  oInterfaceMgr.playerClicked( index );
};

var listenersSetup = function() {
  $('#leftArrowButton').click(function(){
    oInterfaceMgr.setMuteToOff();
    oInterfaceMgr.mapMoveLeft();
  });
  $('#rightArrowButton').click(function(){
    oInterfaceMgr.setMuteToOff();
    oInterfaceMgr.mapMoveRight();
  });
  $('#muteButton').click(function(){
    oInterfaceMgr.muteToggle();
  });

  // Listen for arrow keys
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      console.log("left");
      oInterfaceMgr.mapMoveLeft();
      break;

      case 38: // up
      console.log("volume up");
      oInterfaceMgr.muteToggle();
      break;

      case 39: // right
      console.log("right");
      oInterfaceMgr.mapMoveRight();
      break;

      case 40: // down
      console.log("volume down");
      oInterfaceMgr.muteToggle();
      break;

      default: return; // exit this handler for other keys
    }

  });
};


// ------ //


// MAIN - ON.READY
$(document).ready(function (){
  listenersSetup();

  // Class Initialization (Psuedoclassical)
  oDatabaseMgr  = new OceanDatabaseManager();

  // Draw page components
  oLocationElementCreator = new OceanLocationElementCreator( oDatabaseMgr );
  oLocationElementCreator.drawAllOceans(); // Draw the available oceans

  // Init a simple HTML5 Audio Controller (iOS/Netscape compatible)
  oAudioController = new PLBAudioController('audioPlayerId');

  // Handle user input (clicks & arrow key presses)
  oInterfaceMgr = new OceanInterfaceManager( oDatabaseMgr, oAudioController, oLocationElementCreator );
});



