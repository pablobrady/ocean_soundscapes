/* 
  PLBAudioController.js - a very simple HTML5 audio controller, that's compatible with iPhone/iPad/Netscape/Chrome.  Amazing.

  
  Expects both MP3 and OGG files, in the form of...

  <audio id='audioPlayer' preload="none" loop controls autoplay>
    <source id="mp3Source" type="audio/mpeg" src="<your-path>/OceanBeach-LandsEndwFogHorn.mp3">
    <source id="oggSource" type="audio/ogg"  src="<your-path>/OceanBeach-LandsEndwFogHorn.ogg">
    Your browser does not support the audio element, please update your browser!
  </audio>

*/


var PLBAudioController = function( playerId ) {
  console.log("PLBAudioController:  playerId = " + playerId);
  this.playerId = playerId;
  this.audioPlayerElement = document.getElementById( playerId );
console.log("1) this.audioPlayerElement = ", this.audioPlayerElement);
};

PLBAudioController.prototype.loadThenPlay = function( anMP3AudioURL ) {
  var anOGGAudioURL = anMP3AudioURL.replace(".mp3", ".ogg"); // Extract .ogg filename

  document.getElementById('mp3Source').src = anMP3AudioURL;
  document.getElementById('oggSource').src = anOGGAudioURL;

  this.audioPlayerElement.load();
  this.audioPlayerElement.play();

};

PLBAudioController.prototype.pause = function() {
  this.audioPlayerElement.pause();
};

PLBAudioController.prototype.play = function() {
  this.audioPlayerElement.play();
};



// TESTS

//if(this.audioPlayerElement) { alert("this.audioPlayerElement created."); }

// console.log("PLBAudioController(): anOGGAudioURL: " + anOGGAudioURL);
// console.log("PLBAudioController(): anMP3AudioURL: " + anMP3AudioURL);

// console.log("PLBAudioController(): doc mp3Source: " + document.getElementById('mp3Source').src);
// console.log("PLBAudioController(): doc anMP3AudioURL: " + document.getElementById('oggSource').src);
