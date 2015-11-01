
var OceanInterfaceManager = function(oDBMgr, oAudioController, oViewMgr) {
  console.log("* OceanInterfaceManager Init *");
  if( !oDBMgr ) { 
    console.error("ERROR - OceanInterfaceManager requires an OceanDatabaseManager class reference to initialize.  Exiting...");
    return;
  }
  if( !oAudioController ) { 
    console.error("ERROR - OceanInterfaceManager requires aAudioPlayer class (maybe PLBAudioController?) to initialize.  Exiting...");
    return;
  }  
  if( !oViewMgr ) { 
    console.error("ERROR - OceanInterfaceManager requires an OceanViewManager class reference to initialize.  Exiting...");
    return;
  }
  this.oDBMgr = oDBMgr;
  this.oAudioController = oAudioController;
  this.oViewMgr = oViewMgr;

  this.currentSelection = 0;
  this.lastSelection = -1;
  this.isMuted = false;

  this.playButtonVisibilityState = this.setupPlayButtonVisibilityStates();

};



OceanInterfaceManager.prototype.setupPlayButtonVisibilityStates = function() {
  var len = this.oDBMgr.getDatabaseLength();
  var array = [];
  for(var i=0; i<len; i++) {
    array.push( true ); // Play button visible
  }
  return array;
};



OceanInterfaceManager.prototype.playerClicked = function(index) {
  this.currentSelection = index;
  document.getElementById('locAudioBut' + this.currentSelection).setAttribute('class', 'buttonImage playButtonImage');

  oAudioController.pause();


  // Current click handling
  var nextState = false; // PLAY IT!
  if(this.currentSelection===this.lastSelection) {
    nextState = !(this.playButtonVisibilityState[this.currentSelection]); // TOGGLE PLAY/PAUSE
  }


  // Reset all
  for(var i=0; i<this.playButtonVisibilityState.length; i++) {
    this.playButtonVisibilityState[i] = true; // reset all play buttons
    document.getElementById('locAudioBut' + i).setAttribute('class', 'buttonImage playButtonImage'); // Showing play button
  }
  this.playButtonVisibilityState[this.currentSelection] = nextState; 


  // Control Audio & Page Elements
  if(!this.playButtonVisibilityState[this.currentSelection]) {
    // Play
    oAudioController.loadThenPlay( this.oDBMgr.getAudioData_audioFileNameWithPath(this.currentSelection) );
    document.getElementById('locAudioBut' + this.currentSelection).setAttribute('class', 'buttonImage pauseButtonImage'); // Showing pause button
   }

  // this.drawPinsWithSelection( this.currentSelection );

  this.lastSelection = this.currentSelection;
};



// MAP MANIPULATION METHODS

OceanInterfaceManager.prototype.mapMoveLeft = function() {
  if ( this.currentSelection > 0 ) {
    this.currentSelection--;
  }
  this.playerClicked(this.currentSelection);
};

OceanInterfaceManager.prototype.mapMoveRight = function() {
  var len = this.oDBMgr.getDatabaseLength();
  if ( this.currentSelection < len-1 ) {
    this.currentSelection++;
  }
  this.playerClicked(this.currentSelection);
};

OceanInterfaceManager.prototype.muteToggle = function() {
  $('#muteButton').toggleClass("mutedMode");
  this.isMuted = !this.isMuted;
  this.isMuted ? oAudioController.pause() : oAudioController.play();
};


OceanInterfaceManager.prototype.drawPinsWithSelection = function( selected ) {
  // console.log("drawPinsWithSelection - " + selected);
  var len = this.oDBMgr.getDatabaseLength();

  $('#leftArrowButton').removeClass("disabled");
  $('#rightArrowButton').removeClass("disabled");

  if(selected===0){
    $('#leftArrowButton').addClass("disabled");
  } else if(selected===len-1) {
    $('#rightArrowButton').addClass("disabled");
  }


  $("#pinId0").animate({
      position: 'relative',
      left: this.oDBMgr.audioDatabase[selected].xpos + "px",
      top:  this.oDBMgr.audioDatabase[selected].ypos + "px",
      opacity: '1.00'
    }, 1000, "swing", function() {
        $( "#pinId0" ).html( "<div>" + function() { this.oDBMgr.getAudioData_locationName(selected); } + "</div>" );
    });

};
