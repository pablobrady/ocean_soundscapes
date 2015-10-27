var currentSelection = 0;


var OceanInterfaceManager = function(oDBMgr, oViewMgr) {
  console.log("* OceanInterfaceManager Init *");
  if( !oDBMgr ) { 
    console.error("ERROR - OceanInterfaceManager requires an OceanDatabaseManager() reference to initialize.  Exiting...");
    return;
  }
  if( !oViewMgr ) { 
    console.error("ERROR - OceanInterfaceManager requires an OceanViewManager() reference to initialize.  Exiting...");
    return;
  }
  this.oDBMgr = oDBMgr;
  this.oViewMgr = oViewMgr;

  this.currentSelection = 0;
  this.lastSelection = -1;

  this.isFirstPlay = true;
  this.playButtonVisibilityState = this.setupPlayButtonVisibilityState();

  this.setupListeners();
};

OceanInterfaceManager.prototype.setupPlayButtonVisibilityState = function() {
  var len = this.oDBMgr.getDatabaseLength();
  var array = [];
  for(var i=0; i<len; i++) {
    array.push( true ); // Play button visible
  }
  return array;
};

OceanInterfaceManager.prototype.setupListeners = function() {
  $('#leftArrowButton').click(function(){    
    moveLeft();
  });
  $('#rightArrowButton').click(function(){    
    moveRight();
  });
  $('#muteButton').click(function(){
    muteToggle();
  });
  // Listen for arrow keys
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      console.log("left");
      moveLeft();
      break;

      case 38: // up
      console.log("volume up");
      muteToggle();
      break;

      case 39: // right
      console.log("right");
      moveRight();
      break;

      case 40: // down
      console.log("volume down");
      muteToggle();
      break;

      default: return; // exit this handler for other keys
    }
    // e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  // Listen for Audio playback start
  document.getElementById('audioPlayer').addEventListener('playing',function() { 
    console.log("this.isPlaying is TRUE");
    this.isFirstPlay=false; 
    // this.playbackHasStarted();
  },false);
};

OceanInterfaceManager.prototype.playerClicked = function(index) {
  this.currentSelection = index;

  $('#nowPlayingMsg2').html(this.oDBMgr.audioDatabase[this.currentSelection].locationName);


  // Reset all PLAY/PAUSE button images
  for(var i=0; i<this.playButtonVisibilityState.length; i++) {
    document.getElementById('locAudioBut' + i).setAttribute('class', 'buttonImage playButtonImage');
  }

  // Current click handling
  if(this.currentSelection===this.lastSelection || this.isFirstPlay===true) {
    this.playButtonVisibilityState[this.currentSelection] = !(this.playButtonVisibilityState[this.currentSelection]);
  } 

  // Control Audio
  if(this.playButtonVisibilityState[this.currentSelection]) {
    pauseAudio();
    document.getElementById('locAudioBut' + this.currentSelection).setAttribute('class', 'buttonImage playButtonImage');
  } else {
    document.getElementById('audioPlayer').setAttribute('src', this.oDBMgr.getAudioData_audioFileNameWithPath(this.currentSelection) );
    loadAudio();
    document.getElementById('locAudioBut' + this.currentSelection).setAttribute('class', 'buttonImage pauseButtonImage');
  }

  this.lastSelection = this.currentSelection;
};





var audioPlayerClicked = function( index ) {
  oInterfaceMgr.playerClicked( index );
};


var moveLeft = function() {
  // console.log("moveLeft! currentSelection="+currentSelection);
  if ( currentSelection > 0 ) {
    currentSelection--;
  }
  drawPinsWithSelection( currentSelection );
};

var moveRight = function() {
  if ( currentSelection < len-1 ) {
    currentSelection++;
  }
  drawPinsWithSelection( currentSelection );
};

var muteToggle = function() {
  $('#muteButton').toggleClass("mutedMode");
  toggleMuteAudio();
};





// MAP FUNCTIONS

// var drawPinsWithSelection = function( selected ) {
//   console.log("drawPinsWithSelection - " + selected);

//   $('#leftArrowButton').removeClass("disabled");
//   $('#rightArrowButton').removeClass("disabled");

//   if(selected===0){
//     $('#leftArrowButton').addClass("disabled");
//   } else if(selected===audioDatabase.length-1) {
//     $('#rightArrowButton').addClass("disabled");
//   }


//   $("#pinId0").animate({
//       position: 'relative',
//       left: audioDatabase[selected].xpos + "px",
//       top: audioDatabase[selected].ypos + "px",
//       opacity: '1.00'
//     }, 1000, "swing", function() {
//         $( "#pinId0" ).html( "<div>" + audioDatabase[selected].locationCountry + "</div>" );
//     });

//   // var pin = document.getElementById('pinId0');
//   // pin.style.position = 'relative';
//   // pin.style.left = "" + audioDatabase[selected].xpos + "px";
//   // pin.style.top = "" + audioDatabase[selected].ypos + "px";
//   // // pin.src = '../images/pin3.png';

//    loadAudio()
// };





var oDatabaseMgr;
var oViewMgr;
var oInterfaceMgr;

// MAIN - ON.READY
$(document).ready(function (){
  jInit(); // Audio Player actions/listeners

  // Class Initialization (Psuedoclassical)
  oDatabaseMgr  = new OceanDatabaseManager();

  oViewMgr      = new OceanViewManager( oDatabaseMgr );
  oViewMgr.drawLocationsStack();

  oInterfaceMgr = new OceanInterfaceManager( oDatabaseMgr, oViewMgr );
  

  // drawPinsWithSelection( 0 );


});



