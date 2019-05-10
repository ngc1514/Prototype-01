var locList = []

function testMath(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeStone(){
    for(i=0; i<10; i++){
        var x = testMath(100, 1300);
        var y = testMath(100, 1300);
        locList.push([x,y]);
    }
}

makeStone()

QUnit.test( "hello test", function( assert ) {
    assert.ok( locList.length == "1", "Passed!" );
});