
var audioDatabase = [
  { 
    "audioFilename": "164767__rucisko__ocean-waves_Coimbra_Portugal.mp3", 
    "locationName": "Figueria da Foz, Portugal", 
    "locationCountry": "Portugal",
    "rating": "5",
    "xpos": "20",
    "ypos": "63",
    "volumeAdj": 0
  },
  { 
    "audioFilename": "20140316-064528-Indonedia-SeaOfJava.mp3", 
    "locationName": "Indonesia, Java Sea", 
    "locationCountry": "Indonesia",
    "rating": "4",
    "xpos": "252",
    "ypos": "162",
    "volumeAdj": 0
  },
  { 
    "audioFilename": "166214__abcopen__southern-ocean__Warrnambool_Australia_Levys-Beach.mp3", 
    "locationName": "Levy's Beach, Warrnambool, Australia",
    "locationCountry": "Australia",
    "rating": "5",
    "xpos": "338",
    "ypos": "269",
    "volumeAdj": -2
  },
  { 
    "audioFilename": "68638__rocktopus__stream-ocean__Warrnambool_AU.mp3", 
    "locationName": "French Polynesia", 
    "locationCountry": "French Polynesia",
    "rating": "4",
    "xpos": "420",
    "ypos": "151",
    "volumeAdj": 0
  },
  { 
    "audioFilename": "OceanBeach-LandsEndwFogHorn.mp3", 
    "locationName": "Land\'s End, San Francisco CA, USA", 
    "locationCountry": "United States",
    "rating": "5",
    "xpos": "525",
    "ypos": "57",
    "volumeAdj": 0
  },
];

var getAudioDataObject = function(index)  {
  if(index>=0 && index<audioDatabase.length) {
    return audioDatabase;
  }
  alert("ERROR - Invalid audio object id.");
};

var getAudioData_audioFileName = function(index)  {
  var obj = getAudioDataObject(index);
  return obj.audioFilename;
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
