/// Ocean View Elements Manager 

var OceanViewManager = function( oDBMgr ) {
  console.log("* OceanViewManger *");
  if( !oDBMgr ) { 
    console.error("ERROR - OceanViewManager requires an OceanDatabaseManager() reference to initialize.  Exiting...");
    return;
  }
  this.oDBMgr = oDBMgr;

};

OceanViewManager.prototype.drawLocationsStack = function() {
  var len = this.oDBMgr.getDatabaseLength();
  for(var i=0; i<len; i++) {
    this.insertLocationNavElement( i, "#locationInsertionPoint" );
  }
};

OceanViewManager.prototype.insertLocationNavElement = function( index, elementId ) {
  var audioDatabase = this.oDBMgr.getAudioDatabase();

  var locationName  = audioDatabase[index].locationName;
  var thumbImageURL = audioDatabase[index].thumb_image_URL;

  var locationHTML = '<div class="liItem" style="background: #666 url( \'images/locations/' + thumbImageURL + '\' ) no-repeat center center;background-size: cover;"><image onclick="audioPlayerClicked(' + index + ')" class="buttonImage" src="images/plb_pauseButton_80x80.png" width="80" height="80" alt=""></image><span>' + locationName + '</span></div>';
  // console.log( "locationHTML = " + locationHTML);

  $( locationHTML ).insertAfter( elementId );
};


