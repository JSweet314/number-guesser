describe('enableButtons', function(){
  it('turns on the submit and clear buttons', function(){
    assert.equal(enableButtons(), document.querySelector('#submit').className == '\bbuttonEnabled\b')
  });
});

mocha.run();