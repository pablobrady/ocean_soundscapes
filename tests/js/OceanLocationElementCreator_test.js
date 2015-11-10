var expect = chai.expect;
var should = chai.should();


describe('Test ocean rollover color manipulations.', function() {

  // Standard Setup
  oDatabaseMgr  = new OceanDatabaseManager();

  // Draw page components
  oLocationElementCreator = new OceanLocationElementCreator( oDatabaseMgr );
  
  it('getOceanColor() returns values from input in the range of 0 to 20.', function() {

    for(var i=0; i<21; i++) {
      expect( !!oLocationElementCreator.getOceanColor(i) ).to.equal( true );
    };

  });

});