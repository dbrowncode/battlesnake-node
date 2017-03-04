var express = require('express')
var router  = express.Router()
var taunts = ["Z", "A", "L", "G", "O"]
var dumbmoves = ['up', 'left', 'down', 'right']
var moves = ['up', 'down', 'left', 'right']
var state = {
  width: 0,
  height: 0,
  coords: [],
  spots: {
    good: [],
    bad: [],
    heads: [],
  },
  nextMove: 'up',
}

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#DFFF00",
    name: "Zalgo",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "ZALGO", // optional, but encouraged!
  }
  state.width = req.body.width
  state.height = req.body.height

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // reset and repopulate board state info
  state.spots.bad = []
  state.spots.good = []
  state.spots.heads = []
  var snakes = req.body.snakes
  for(var i=0; i<snakes.length; i++){
    if(snakes[i].id == req.body.you){
      state.coords = snakes[i].coords
    }else{
      state.spots.heads.push(snakes[i].coords[0])
    }
    for(var j=0; j<snakes[i].coords.length; j++){
      state.spots.bad.push(snakes[i].coords[j])
    }
  }
  var fruits = req.body.food
  for(var f=0; f<fruits.length; f++){
    state.spots.good.push(fruits[f])
  }

  // find nearby spots and make sure they aren't deadly
  var possMoves = []
  var testSpots = [
    [state.coords[0], state.coords[1] - 1],
    [state.coords[0], state.coords[1] + 1],
    [state.coords[0] - 1, state.coords[1]],
    [state.coords[0] + 1, state.coords[1]],
  ]
  for(var i=0; i<testSpots.length; i++){
    if(state.spots.bad.indexOf(testSpots[i]) === -1){
      //spot isn't lethal
      possMoves.push(testSpots[i])
    }
  }

  //if one of the possMoves spots has food, yolo, treat yo self
  for(var i=0; i<possMoves.length; i++){
    if(state.spots.good.indexOf(possMoves[i]) != -1){
      state.nextMove = moves[testSpots.indexOf(possMoves[i])]
      var data = {
        move: state.nextMove,
        taunt: 'YUM',
      }
      return res.json(data)
    }
  }

  //if we got here, there is no adjacent food. try to find if there's food aligned with us i guess, idk
  var alignedFoods = []
  for(var j=0; j<state.spots.good.length; j++){
    if(state.spots.good[j][0] == state.coords[0] || state.spots.good[j][1] == state.coords[1]){
      alignedFoods.push(state.spots.good[j])
    }
  }
  //todo: check the aligned foods and find the closest
  // for(var i=0; i<alignedFoods.length; i++){
  //
  // }

  // so there's no easily findable food. pick a valid move at random if there are any.
  if(possMoves.length > 0){
    state.nextMove = moves[testSpots.indexOf(possMoves[Math.floor(Math.random() * possMoves.length)])]
  }else{
    //no non-lethal moves? rip, ascend to your death
    state.nextMove = 'up'
  }

  var data = {
    move: state.nextMove,
    //move: moves[req.body.turn % dumbmoves.length],
    taunt: taunts[req.body.turn % taunts.length],
  }
  if(possMoves.length > 0) {
    console.log(possMoves)
  }
  return res.json(data)
})

module.exports = router
