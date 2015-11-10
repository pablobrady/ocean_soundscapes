
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

  // Interface initialization
  this.playButtonVisibilityState = this.setupPlayButtonVisibilityStates();
  this.setupAllOceanListeners();

};


OceanInterfaceManager.prototype.setupAllOceanListeners = function() {
  var len = this.oDBMgr.getDatabaseLength();
  var bindThis = this;

  var helpClickAudioPlayer = function( index ) {
    return function() {
      bindThis.playerClicked( index );
    }
  };

  var helpMouseoverAudioPlayer = function( index ) {
    return function() {
      bindThis.playerMouseover( index );
    }
  };

  var helpMouseleaveAudioPlayer = function( index ) {
    return function() {
      bindThis.playerMouseleave( index );
    }
  };



  for(var index=0; index<len; index++) {
    // Each ocean listens for...
    $( '.oceanChild:nth('+index+')' ).on('click', helpClickAudioPlayer(index) );
    $( '.oceanChild:nth('+index+')' ).on('mouseover', helpMouseoverAudioPlayer(index) );
    $( '.oceanChild:nth('+index+')' ).on('mouseleave', helpMouseleaveAudioPlayer(index) );
  }
};

OceanInterfaceManager.prototype.setupPlayButtonVisibilityStates = function() {
  var len = this.oDBMgr.getDatabaseLength();
  var array = [];
  for(var i=0; i<len; i++) {
    array.push( true ); // Play button visible
  }
  return array;
};


// INTERFACE EVENT HANDLING

OceanInterfaceManager.prototype.playerMouseover = function(index) {
  if( this.oAudioController.isPlaying && this.currentSelection===index ) return; // No changes during "currentSelection's" playback.

  $('#oc' + index + '.oceanChild .ocImageDiv' ).removeClass("blendModeEnabled");

};

OceanInterfaceManager.prototype.playerMouseleave = function(index) {
  if( this.oAudioController.isPlaying && this.currentSelection===index ) return; // No changes during "currentSelection's" playback.

  $('#oc' + index + '.oceanChild .ocImageDiv' ).addClass("blendModeEnabled");
};

OceanInterfaceManager.prototype.playerClicked = function(index) {
  this.currentSelection = index;
  $('#locAudioBut' + this.currentSelection).removeClass('pauseButtonImage').addClass('playButtonImage')

  oAudioController.pause();
  this.setMuteToOff();


  // Current click handling
  var nextState = false; // PLAY IT!
  if(this.currentSelection===this.lastSelection) {
    nextState = !(this.playButtonVisibilityState[this.currentSelection]); // TOGGLE PLAY/PAUSE
  }


  // Reset all
  for(var i=0; i<this.playButtonVisibilityState.length; i++) {
    this.playButtonVisibilityState[i] = true; // reset all play buttons
    $('#locAudioBut' + i).removeClass('pauseButtonImage').addClass('playButtonImage'); // Showing play button
    $('#oc' + i + '.oceanChild .ocImageDiv' ).addClass("blendModeEnabled");
  }
  this.playButtonVisibilityState[this.currentSelection] = nextState; 


  // Control Audio & Page Elements
  if(!this.playButtonVisibilityState[this.currentSelection]) {
    // Play
    oAudioController.loadThenPlay( this.oDBMgr.getAudioData_audioFileNameWithPath(this.currentSelection) );
    $('#locAudioBut' + this.currentSelection).removeClass('playButtonImage').addClass('pauseButtonImage'); // Showing pause button
    $('#oc' + this.currentSelection + '.oceanChild .ocImageDiv' ).removeClass("blendModeEnabled");
   }

  // this.drawPinsWithSelection( this.currentSelection );

  this.lastSelection = this.currentSelection;
};



// CONTROLLING THE AUDIO PLAYER

OceanInterfaceManager.prototype.muteToggle = function() {
  $('#muteButton').toggleClass("mutedMode");
  this.isMuted = !this.isMuted;
  if( this.isMuted ) {
    oAudioController.pause();
  } else {
    oAudioController.play();
  }
};

OceanInterfaceManager.prototype.setMuteToOff = function() {
  $('#muteButton').removeClass("mutedMode");
  this.isMuted = false;
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
