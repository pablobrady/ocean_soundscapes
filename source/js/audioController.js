// http://demo.codesamplez.com/javascript/audio
// http://codesamplez.com/programming/control-html5-audio-with-jquery
var audio;
var lastVolumeLevel = 0.75;
function jInit(){
    audio = $("#audioPlayer");
    addEventHandlers();
}

function addEventHandlers(){
    $("a.load").click(loadAudio);
    $("a.start").click(startAudio);
    $("a.forward").click(forwardAudio);
    $("a.back").click(backAudio);
    $("a.pause").click(pauseAudio);
    $("a.stop").click(stopAudio);
    $("a.volume-up").click(volumeUp);
    $("a.volume-down").click(volumeDown);
    $("a.mute").click(toggleMuteAudio);

}

function loadAudio(){
    audio.bind("load",function(){ 
        var errmsg = "Sorry but there was an error: ";
        if ( status == "error" ) {
          alert( errmsg + xhr.status + " " + xhr.statusText );
        }
    });
    unmuteAudio();
    audio.trigger('load');
}

function startAudio(){
    unmuteAudio();
    audio.trigger('play');
}

function pauseAudio(){
    audio.trigger('pause');
}

function stopAudio(){
    pauseAudio();
    audio.prop("currentTime",0);
}

function forwardAudio(){
    pauseAudio();
    audio.prop("currentTime",audio.prop("currentTime")+5);
    startAudio();
}

function backAudio(){
    pauseAudio();
    audio.prop("currentTime",audio.prop("currentTime")-5);
    startAudio();
}

function volumeUp(){
    console.log("volumeUp!");
    var volume = audio.prop("volume")+0.2;
    if(volume >1){
        volume = 1;
    }
    audio.prop("volume",volume);
}

function volumeDown(){
    console.log("volumeDown!");
    var volume = audio.prop("volume")-0.2;
    if(volume <0){
        volume = 0;
    }
    audio.prop("volume",volume);
}

function toggleMuteAudio(){
    audio.prop("muted",!audio.prop("muted"));
}


function muteAudio(){
    lastVolumeLevel = audio.prop("volume");
    audio.prop("volume",0);
}

function unmuteAudio(){
    audio.prop("volume",lastVolumeLevel);
}


