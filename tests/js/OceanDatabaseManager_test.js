var expect = chai.expect;
var should = chai.should();



describe('Test integrity of database audioFilename fields.', function() {

  // Standard Setup
  var oDatabaseMgr = new OceanDatabaseManager();

  var countA = 0;
  oDatabaseMgr.audioDatabase.forEach(function(test){

    it('The audioFilename field ends with ".mp3", and not ".ogg". (Record ' + countA + ')', function() {
      var sublen = test.audioFilename.length - 4;
      expect( test.audioFilename.indexOf('.mp3')===sublen ).to.equal( true );

      var oggSublen = test.audioFilename.length - 4;
      expect( test.audioFilename.indexOf('.ogg')===oggSublen ).to.equal( false );
    });
    countA++;
  });

  var countB = 0;
  oDatabaseMgr.audioDatabase.forEach(function(test){

    it('The audioFilename field contains no accidental spaces. (Record ' + countB + ')', function() {
      expect( test.audioFilename.indexOf('  ')>-1 ).to.equal( false );
    });
    countB++;
  });

});

// "/audio/ocean/";

describe('Test integrity of the database.getAudioData_audioFileNameWithPath() method.', function() {

  // Standard Setup
  var oDatabaseMgr = new OceanDatabaseManager();

  it('The (obj).getAudioData_audioFileNameWithPath( 0 ) contains the expected path "/audio/ocean/".', function() {
    var aFullPath = oDatabaseMgr.getAudioData_audioFileNameWithPath(0);
    expect( aFullPath.indexOf('/audio/ocean/')>-1 ).to.equal( true );
  });

});




describe('Each record contains the all the required fields, and passes a sanity check.', function() {

  // Standard Setup
  var oDatabaseMgr = new OceanDatabaseManager();

  var count = 0;
  oDatabaseMgr.audioDatabase.forEach(function(test){
    it('All required fields exist in record #' + count + '.', function() {
      expect( !!test.audioFilename ).to.equal( true );

      expect( !!test.locationName ).to.equal( true );

      expect( !!test.locationCountry ).to.equal( true );

      expect( !!test.thumb_image_URL ).to.equal( true );
      var imageSublen = test.thumb_image_URL.length - 4;
      expect( test.thumb_image_URL.indexOf('.jpg')===imageSublen || test.thumb_image_URL.indexOf('.png')===imageSublen ).to.equal( true );

      expect( !!test.xpos ).to.equal( true );         // fails on "0" (which is okay for these values)
      expect( isNaN(test.xpos) ).to.equal( false ); 

      expect( !!test.ypos ).to.equal( true );         // fails on "0" (which is okay for these values)
      expect( isNaN(test.ypos) ).to.equal( false ); 

      expect( !!test.volumeAdj || test.volumeAdj===0 ).to.equal( true ); 
        // Legal values are either NOT FALSEY (any non-zero), or exactly ZERO.  (This traps empty strings.)
      expect( isNaN(test.volumeAdj) ).to.equal( false ); 

    });

    count++;
  });

});






