var OceanLocationElementCreator = function( oDBMgr ) {
  console.log("* OceanViewManger Init *");
  if( !oDBMgr ) { 
    console.error("ERROR - OceanViewManager requires an OceanDatabaseManager() reference to initialize.  Exiting...");
    return;
  }
  this.oDBMgr = oDBMgr;

};

// View Drawing
OceanLocationElementCreator.prototype.drawAllOceans = function() {
  var len = this.oDBMgr.getDatabaseLength();
  for(var i=0; i<len; i++) {
    this.drawEachOcean( i, "#oc"+i );
  }
};

// View Templates
OceanLocationElementCreator.prototype.drawEachOcean = function( index, elementId ) {
  var audioDatabase = this.oDBMgr.getAudioDatabase();

  var locationName  = audioDatabase[index].locationName;
  var thumbImageURL = audioDatabase[index].thumb_image_URL;

  // var locationHTML = '<div id="locBut' + index + '" class="liItem liItemBorderBlue" style="background: #666 url( \'images/locations/' + thumbImageURL + '\' ) no-repeat center center;background-size: cover;"><image id="locAudioBut' + index + '" onclick="audioPlayerClicked(' + index + ')" class="buttonImage playButtonImage" width="75" height="75" border="0" alt=""></image><span>' + locationName + '</span></div>';



  var locationHTML = '<li class="oceanChild">' + 
    '<div class="ocImageDiv" style="background: #666 url( \'images/locations/' + thumbImageURL + '\' ) no-repeat center center;background-size: cover;">'+ 
     '<div class="ocTextDiv"><p>' + locationName + '</p></div>';
     '</li>';

//var locationHTML = '<p>ITEM: ' + index + '</p>';

  // function insertAfter(referenceNode, newNode) {
  //   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  // }

  // var el = document.createElement("span");
  // el.innerHTML = "test";
  // var div = document.getElementById( elementId );
  // insertAfter(div, el);


  $( locationHTML ).insertAfter( elementId );
};


