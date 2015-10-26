var currentSelection = 0;
var len = audioDatabase.length;




// MAP FUNCTIONS

// var drawPinsWithSelection = function( selected ) {
//   console.log("drawPinsWithSelection - " + selected);

//   $('#leftArrowButton').removeClass("disabled");
//   $('#rightArrowButton').removeClass("disabled");

//   if(selected===0){
//     $('#leftArrowButton').addClass("disabled");
//   } else if(selected===audioDatabase.length-1) {
//     $('#rightArrowButton').addClass("disabled");
//   }


//   $("#pinId0").animate({
//       position: 'relative',
//       left: audioDatabase[selected].xpos + "px",
//       top: audioDatabase[selected].ypos + "px",
//       opacity: '1.00'
//     }, 1000, "swing", function() {
//         $( "#pinId0" ).html( "<div>" + audioDatabase[selected].locationCountry + "</div>" );
//     });

//   // var pin = document.getElementById('pinId0');
//   // pin.style.position = 'relative';
//   // pin.style.left = "" + audioDatabase[selected].xpos + "px";
//   // pin.style.top = "" + audioDatabase[selected].ypos + "px";
//   // // pin.src = '../images/pin3.png';

//   console.log("Selected filename: " + audioDatabase[selected].audioFilename);
//   $('#nowPlayingMsg2').html(audioDatabase[selected].locationName);

//   $('#audioPlayer').attr('src', "audio/ocean/" + audioDatabase[selected].audioFilename);
//   $('#audioPlayer').load();
// };

// var moveLeft = function() {
//   console.log("moveLeft! currentSelection="+currentSelection);
//   if ( currentSelection > 0 ) {
//     currentSelection--;
//   }
//   drawPinsWithSelection( currentSelection );
// };

// var moveRight = function() {
//   if ( currentSelection < len-1 ) {
//     currentSelection++;
//   }
//   drawPinsWithSelection( currentSelection );
// };



var muteToggle = function() {
  $('#muteButton').toggleClass("mutedMode");
  toggleMuteAudio();
};



// MAIN - ON.READY
$(document).ready(function (){
  jInit(); // Audio Player actions/listeners

  $('#leftArrowButton').click(function(){    
    moveLeft();
  });

  $('#rightArrowButton').click(function(){    
    moveRight();
  });

  $('#muteButton').click(function(){
    muteToggle();
  });

  // Listen for arrow keys
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      console.log("left");
      moveLeft();
      break;

      case 38: // up
      console.log("volume up");
      muteToggle();
      break;

      case 39: // right
      console.log("right");
      moveRight();
      break;

      case 40: // down
      console.log("volume down");
      muteToggle();
      break;

      default: return; // exit this handler for other keys
    }
    // e.preventDefault(); // prevent the default action (scroll / move caret)
  });



  // drawPinsWithSelection( 0 );

  //// Insert Location HTML (jQuery)
  $(function(){

    console.log("GET: " + audioDatabase.length);



    for(var i=0; i<audioDatabase.length; i++) {
      insertLocationNavElement( i, "#locationInsertionPoint" );
    }

  });

});



