var expect = chai.expect;
var should = chai.should();


describe('Test basic functionality of audio element (managed via PLBAudioController).', function() {

  var id = "audioPlayerId";
  var oAudioController = new PLBAudioController( id );
  var anMP3AudioURL = "../public/audio/ocean/frenchPolynesia.mp3";

  it('Should find an "<audio>" html element named "' + audioPlayerId + '" (in testrunner.html only).', function() {
    expect( document.getElementById('audioPlayerId').tagName ).to.equal("AUDIO");
  });

  it('Should try to loadAndPlay() a local audio file.', function() {
    expect( oAudioController.loadThenPlay( anMP3AudioURL ) ).to.equal( true );
  });

  it('Should have set the "mp3Source" element.', function() {
    var str = document.getElementById('mp3Source').src;
    expect( str.length>0 ).to.equal( true );
  });

  it('Should have set the "oggSource" element.', function() {
    var str = document.getElementById('oggSource').src;
    expect( str.length>0 ).to.equal( true );
  });

  it('Should try to play() a local audio file.', function() {
    expect( oAudioController.play() ).to.equal( true );
  });

  it('Should try to pause() (aka stop) an audio file playback.', function() {
    expect( oAudioController.pause() ).to.equal( true );
  });

  // WISHLIST:  Test reactions to invalid or empty <source SRC=""> attributes, and try to play them.  
  // Rumor has it that different browsers may behave differently here (unlike with the pure <audio src=""> format).

});

