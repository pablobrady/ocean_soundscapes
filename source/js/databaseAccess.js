'use strict;'

var OceanDatabaseManager = function() {
  console.log("* OceanDatabaseManager Init *");
  this.AUDIOPATH = "audio\\ocean\\";
  this.audioDatabase = [
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
      "volumeAdj": 0
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


};

OceanDatabaseManager.prototype.getAudioData_audioFileNameWithPath = function(index)  {
  var obj = this.AUDIOPATH + this.audioDatabase[index].audioFilename; // getAudioDataObject(index);
  console.log("INDEX = " + index + " FILE: " + obj);
  return obj;
};

// for now, allow grabbing entire db object.
OceanDatabaseManager.prototype.getAudioDatabase = function(index)  {
  return this.audioDatabase;
};

OceanDatabaseManager.prototype.getAudioDataObject = function(index)  {
  if(index>=0 && index<this.audioDatabase.length) {
    return this.audioDatabase;
  }
  alert("ERROR - Invalid audio object id.");
};

OceanDatabaseManager.prototype.getAudioData_locationName = function(index)  {
  var obj = this.getAudioDataObject(index);
  return obj.locationName;
};

OceanDatabaseManager.prototype.getAudioData_rating = function(index)  {
  var obj = this.getAudioDataObject(index);
  return obj.rating;
};

OceanDatabaseManager.prototype.getAudioData_xpos = function(index)  {
  var obj = this.getAudioDataObject(index);
  return obj.xpos;
};

OceanDatabaseManager.prototype.getAudioData_ypos = function(index)  {
  var obj = this.getAudioDataObject(index);
  return obj.ypos;
};

OceanDatabaseManager.prototype.getDatabaseLength = function() {
  return this.audioDatabase.length;
};





