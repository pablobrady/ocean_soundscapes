var audio;
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
    audio.bind("load",function(){ });
    audio.trigger('load');
}

function startAudio(){
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