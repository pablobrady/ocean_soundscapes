var OceanLocationElementCreator = function( oDBMgr ) {
  console.log('* OceanViewManger Init *');
  if( !oDBMgr ) { 
    console.error('ERROR - OceanViewManager requires an OceanDatabaseManager() reference to initialize.  Exiting...');
    return;
  }
  this.oDBMgr = oDBMgr;
  this.colorArray = ['c_ocean0', 'c_ocean1', 'c_ocean2', 'c_ocean3', 'c_ocean4', 'c_ocean5'];
};

// View Drawing
OceanLocationElementCreator.prototype.drawAllOceans = function() {
  var len = this.oDBMgr.getDatabaseLength();
  for(var i=0; i<len; i++) {
    this.drawEachOcean( i, "#oc"+i );
  }
};

OceanLocationElementCreator.prototype.getOceanColor = function(index) {
  var i = index;
  var len = this.colorArray.length;
  while( i>(len-1) ) i-=len; 
  return this.colorArray[i];
};

// View Templates
OceanLocationElementCreator.prototype.drawEachOcean = function( index, elementId ) {
  var audioDatabase = this.oDBMgr.getAudioDatabase();

  var locationName  = audioDatabase[index].locationName;
  var thumbImageURL = audioDatabase[index].thumb_image_URL;

console.log("getOceanColor(" + index + ") = " + this.getOceanColor(index) );
var oceanColor = this.getOceanColor(index);

  var locationHTML = '<li id="oc' + index + '" class="oceanChild" onclick="audioPlayerClicked(' + index + ')">' + 
    '<div class="ocImageDiv" style="background: #666 url( \'images/locations/' + thumbImageURL + '\' ) no-repeat center center;background-size: cover;">'+ 
      '<div id="locAudioBut' + index + '" class="buttonImage playButtonImage" style="width:75px;height:75px;" ></div>' + 
      '<div class="ocTextDiv"><p>' + locationName + '</p></div></li>';


//var locationHTML = '<div class="buttonImage playButtonImage" style="width:75px;height:75px;" ></div>';

  $( locationHTML ).insertAfter( elementId );
};
