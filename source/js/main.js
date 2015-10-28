var oDatabaseMgr;
var oLocationElementCreator;
var oInterfaceMgr;

// ------ //

var audioPlayerClicked = function( index ) {
  oInterfaceMgr.playerClicked( index );
};


// var jQueryListenersSetup = function() {
//   $('#leftArrowButton').click(function(){
//     oInterfaceMgr.mapMoveLeft();
//   });
//   $('#rightArrowButton').click(function(){
//     oInterfaceMgr.mapMoveRight();
//   });
//   $('#muteButton').click(function(){
//     oInterfaceMgr.muteToggle();
//   });

//   // Listen for arrow keys
//   $(document).keydown(function(e) {
//     switch(e.which) {
//       case 37: // left
//       console.log("left");
//       oInterfaceMgr.mapMoveLeft();
//       break;

//       case 38: // up
//       console.log("volume up");
//       oInterfaceMgr.muteToggle();
//       break;

//       case 39: // right
//       console.log("right");
//       oInterfaceMgr.mapMoveRight();
//       break;

//       case 40: // down
//       console.log("volume down");
//       oInterfaceMgr.muteToggle();
//       break;

//       default: return; // exit this handler for other keys
//     }

//   });
// };


// ------ //


// MAIN - ON.READY
$(document).ready(function (){
  // Initialization
  jInit(); // Init the Audio Player actions/listeners (in audioController.js - external library)
  // jQueryListenersSetup(); // Future feature


  // Class Initialization (Psuedoclassical)
  oDatabaseMgr  = new OceanDatabaseManager();


  // Draw any complex elements
  oLocationElementCreator = new OceanLocationElementCreator( oDatabaseMgr );
  oLocationElementCreator.drawLocationsStack(); // Draw the available locations on the left column (desktop)


  // Handle user input (clicks & arrow key presses)
  oInterfaceMgr = new OceanInterfaceManager( oDatabaseMgr, oLocationElementCreator );

  // Plug-in the audio control callback methods (from audioController.js)
  oInterfaceMgr.setLoadAudioCallback( loadAudio );
  oInterfaceMgr.setUnmutedAudioCallback( unmuteAudio );
  oInterfaceMgr.setMutedAudioCallback( muteAudio );

});



