var currentSelection = 0;
var len = audioDatabase.length;

var drawPinsWithSelection = function( selected ) {
  console.log("drawPinsWithSelection - " + selected);

  $('#leftArrowButton').removeClass("disabled");
  $('#rightArrowButton').removeClass("disabled");

  if(selected===0){
    $('#leftArrowButton').addClass("disabled");
  } else if(selected===audioDatabase.length-1) {
    $('#rightArrowButton').addClass("disabled");
  }


  $("#pinId0").animate({
      position: 'relative',
      left: audioDatabase[selected]['xpos'] + "px",
      top: audioDatabase[selected]['ypos'] + "px",
      opacity: '1.00'
    }, 1000, "swing", function() {
        $( "#pinId0" ).html( "<div>" + audioDatabase[selected]['locationCountry'] + "</div>" );
    });

  // var pin = document.getElementById('pinId0');
  // pin.style.position = 'relative';
  // pin.style.left = "" + audioDatabase[selected]['xpos'] + "px";
  // pin.style.top = "" + audioDatabase[selected]['ypos'] + "px";
  // // pin.src = '../images/pin3.png';

  console.log("Selected filename: " + audioDatabase[selected]['audioFilename'])
  $('#nowPlayingMsg2').html(audioDatabase[selected]['locationName']);

  $('#audioPlayer').attr('src', "audio/ocean/" + audioDatabase[selected]['audioFilename']);
  $('#audioPlayer').load();
};



var moveLeft = function() {
  console.log("moveLeft! currentSelection="+currentSelection)
  if ( currentSelection > 0 ) {
    currentSelection--;
  }
  drawPinsWithSelection( currentSelection );
};

var moveRight = function() {
  if ( currentSelection < len-1 ) {
    currentSelection++;
  }
  drawPinsWithSelection( currentSelection );
};

var muteToggle = function() {
  $('#muteButton').toggleClass("mutedMode");
  toggleMuteAudio();
}
