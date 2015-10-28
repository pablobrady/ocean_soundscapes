
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
  this.playButtonVisibilityState = this.setupPlayButtonVisibilityStates();

  this.setupListeners();
};


OceanInterfaceManager.prototype.setupPlayButtonVisibilityStates = function() {
  var len = this.oDBMgr.getDatabaseLength();
  var array = [];
  for(var i=0; i<len; i++) {
    array.push( true ); // Play button visible
  }
  return array;
};


OceanInterfaceManager.prototype.setupListeners = function() {
  // Listen for Audio playback start
  document.getElementById('audioPlayer').addEventListener('playing',function() { 
    // console.log("this.isPlaying is TRUE");
    this.isFirstPlay=false; 
  },false);
};


OceanInterfaceManager.prototype.playerClicked = function(index) {
  this.currentSelection = index;

  document.getElementById('locAudioBut' + this.currentSelection).setAttribute('class', 'buttonImage playButtonImage');

  // Current click handling
  var nextState = false; // PLAY IT!
  if(this.currentSelection===this.lastSelection) {
    nextState = !(this.playButtonVisibilityState[this.currentSelection]); // TOGGLE PLAY/PAUSE
  }

  // Reset all PLAY/PAUSE button images / borders
  for(var i=0; i<this.playButtonVisibilityState.length; i++) {
    document.getElementById('locAudioBut' + i).setAttribute('class', 'buttonImage playButtonImage');
    document.getElementById('locBut' + i).setAttribute('class', 'liItem liItemBorderBlue');
    this.playButtonVisibilityState[i] = true; // reset all play buttons
  }
  this.playButtonVisibilityState[this.currentSelection] = nextState; // reset all play buttons

  // Control Audio / Page Elements
  if(this.playButtonVisibilityState[this.currentSelection]) {
    document.getElementById('nowPlayingMsg1').innerHTML = "Select a location on the left.";
    document.getElementById('nowPlayingMsg2').innerHTML = "&nbsp;";
    this.mutedAudioCallback();
    document.getElementById('locAudioBut' + this.currentSelection).setAttribute('class', 'buttonImage playButtonImage');
    document.getElementById('locBut' + this.currentSelection).setAttribute('class', 'liItem liItemBorderBlue');
  } else {
    document.getElementById('audioPlayer').setAttribute('src', this.oDBMgr.getAudioData_audioFileNameWithPath(this.currentSelection) );
    document.getElementById('nowPlayingMsg1').innerHTML = "Now playing ocean sounds from...";
    document.getElementById('nowPlayingMsg2').innerHTML = this.oDBMgr.audioDatabase[this.currentSelection].locationName;
    this.unmutedAudioCallback();
    this.loadAudioCallback();
    document.getElementById('locAudioBut' + this.currentSelection).setAttribute('class', 'buttonImage pauseButtonImage');
    document.getElementById('locBut' + this.currentSelection).setAttribute('class', 'liItem liItemBorderRed');
  }

  this.drawPinsWithSelection( this.currentSelection );

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
  this.toggleAudioCallback();
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

// Plugin Audio Manager Interface
OceanInterfaceManager.prototype.setLoadAudioCallback = function( cb ) {
  this.loadAudioCallback = cb;
};

OceanInterfaceManager.prototype.setUnmutedAudioCallback = function( cb ) {
  this.unmutedAudioCallback = cb;
};

OceanInterfaceManager.prototype.setMutedAudioCallback = function( cb ) {
  this.mutedAudioCallback = cb;
};
