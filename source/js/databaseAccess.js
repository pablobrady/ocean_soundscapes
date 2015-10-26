
var audioDatabase = [
  { 
    "audioFilename": "164767__rucisko__ocean-waves_Coimbra_Portugal.mp3", 
    "locationName": "Figueria da Foz, Portugal", 
    "locationCountry": "Portugal",
    "thumb_image_URL": "Coimbra_Portugal_thumb.jpg",
    "rating": "5",
    "xpos": "20",
    "ypos": "63",
    "volumeAdj": 0
  },
  { 
    "audioFilename": "20140316-064528-Indonedia-SeaOfJava.mp3", 
    "locationName": "Indonesia, Java Sea", 
    "locationCountry": "Indonesia",
    "thumb_image_URL": "20140316-064528-Indonedia-SeaOfJava_thumb.jpg",
    "rating": "4",
    "xpos": "252",
    "ypos": "162",
    "volumeAdj": 0
  },
  { 
    "audioFilename": "166214__abcopen__southern-ocean__Warrnambool_Australia_Levys-Beach.mp3", 
    "locationName": "Levy's Beach, Warrnambool, Australia",
    "locationCountry": "Australia",
    "thumb_image_URL": "Levys-Beach_Warrnambool_Australia_thumb.jpg",
    "rating": "5",
    "xpos": "338",
    "ypos": "269",
    "volumeAdj": -2
  },
  { 
    "audioFilename": "frenchPolynesia.mp3", 
    "locationName": "French Polynesia", 
    "locationCountry": "French Polynesia",
    "thumb_image_URL": "fakarava_island_french_polynesia_thumb.jpg",
    "rating": "4",
    "xpos": "420",
    "ypos": "151",
    "volumeAdj": 0
  },
  { 
    "audioFilename": "OceanBeach-LandsEndwFogHorn.mp3", 
    "locationName": "Land's End, San Francisco CA, USA", 
    "locationCountry": "United States",
    "thumb_image_URL": "OceanBeach-LandsEndwFogHorn_thumb.jpg",
    "rating": "5",
    "xpos": "525",
    "ypos": "57",
    "volumeAdj": 0
  }
];

var audioPlayerClicked = function( index ) {
  alert("CLICKED ON OCEAN " + index + "!");
};

var insertLocationNavElement = function( index, elementId ) {
  var locationName = audioDatabase[index].locationName;
  var thumbImageURL = audioDatabase[index].thumb_image_URL;

  var locationHTML = '<div class="liItem" style="background: #666 url( \'images/locations/' + thumbImageURL + '\' ) no-repeat center center;background-size: cover;"><image onclick="audioPlayerClicked(' + index + ')" class="buttonImage" src="images/plb_pauseButton_80x80.png" width="80" height="80" alt=""></image><span>' + locationName + '</span></div>';
  // console.log( "locationHTML = " + locationHTML);

  $( locationHTML ).insertAfter( elementId );
};

var getAudioData_audioFileName = function(index)  {
  var obj = getAudioDataObject(index);
  return obj.audioFilename;
};



var getAudioDataObject = function(index)  {
  if(index>=0 && index<audioDatabase.length) {
    return audioDatabase;
  }
  alert("ERROR - Invalid audio object id.");
};

var getAudioData_locationName = function(index)  {
  var obj = getAudioDataObject(index);
  return obj.locationName;
};

var getAudioData_rating = function(index)  {
  var obj = getAudioDataObject(index);
  return obj.rating;
};

var getAudioData_xpos = function(index)  {
  var obj = getAudioDataObject(index);
  return obj.xpos;
};

var getAudioData_ypos = function(index)  {
  var obj = getAudioDataObject(index);
  return obj.ypos;
};

var getDatabaseLength = function() {
  return audioDatabase.length;
};

