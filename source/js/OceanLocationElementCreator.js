var OceanLocationElementCreator = function( oDBMgr ) {
  console.log('* OceanViewManger Init *');
  if( !oDBMgr ) { 
    console.error('ERROR - OceanViewManager requires an OceanDatabaseManager() reference to initialize.  Exiting OceanLocationElementCreator()...');
    return;
  }
  this.oDBMgr = oDBMgr;

  this.colorArray = [ 'rgba(200,0,0,0.66)',    // red
                      'rgba(32,255,32,0.5)',   // green
                      'rgba(255,100,0,0.66)',  // orange
                      'rgba(32,32,255,0.75)',  // blue
                      'rgba(200,32,200,0.5)',  // purple
                      'rgba(250,250,32,0.75)', // yellow
  ];

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

  var locationHTML = '<li id="oc' + index + '" class="oceanChild">' + 
    '<div class="ocImageDiv">'+ 
      '<div id="locAudioBut' + index + '" class="buttonImage" style="width:75px;height:75px;" ></div>' + 
      '<div class="ocTextDiv"><p>' + locationName + '</p></div></li>';


  $( locationHTML ).insertAfter( elementId );



  // Set initial Play Button
  $('#locAudioBut' + index).addClass('playButtonImage');

  // Set location image
  $('#oc' + index + '.oceanChild .ocImageDiv').css({
    'background-image': 'url( images/locations/' + thumbImageURL + ' )',
    'background-color': this.colorArray[index]
  }).addClass( 'blendModeEnabled' );

};

