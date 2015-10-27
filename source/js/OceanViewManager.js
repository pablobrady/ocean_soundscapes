/// Ocean View Elements Manager 

var OceanViewManager = function( oDBMgr ) {
  console.log("* OceanViewManger Init *");
  if( !oDBMgr ) { 
    console.error("ERROR - OceanViewManager requires an OceanDatabaseManager() reference to initialize.  Exiting...");
    return;
  }
  this.oDBMgr = oDBMgr;

};

// View Drawing
OceanViewManager.prototype.drawLocationsStack = function() {
  var len = this.oDBMgr.getDatabaseLength();
  for(var i=0; i<len; i++) {
    this.insertLocationNavElement( i, "#locationInsertionPoint" );
  }
};

// View Templates
OceanViewManager.prototype.insertLocationNavElement = function( index, elementId ) {
  var audioDatabase = this.oDBMgr.getAudioDatabase();

  var locationName  = audioDatabase[index].locationName;
  var thumbImageURL = audioDatabase[index].thumb_image_URL;

  var locationHTML = '<div id="locBut' + index + '" class="liItem" style="background: #666 url( \'images/locations/' + thumbImageURL + '\' ) no-repeat center center;background-size: cover;"><image id="locAudioBut' + index + '" onclick="audioPlayerClicked(' + index + ')" class="buttonImage playButtonImage" width="75" height="75" border="0" alt=""></image><span>' + locationName + '</span></div>';

  $( locationHTML ).insertAfter( elementId );
};


