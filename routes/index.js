var express = require('express')
var router  = express.Router()
var taunts = ["Z", "A", "L", "G", "O"]
var moves = ['up', 'left', 'down', 'right']
var state = {
  width: 0,
  height: 0,
  coords: [],
  spots: {
    good: [],
    bad: [],
    heads: [],
  }
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
  // NOTE: Do something here to generate your move
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

  // Response data
  var data = {
    move: moves[req.body.turn % moves.length], // one of: ['up','down','left','right']
    taunt: taunts[req.body.turn % taunts.length], // optional, but encouraged!
  }
  //console.log(state.coords)
  //for(var i=0; i<state.board.length; i++){
  //  console.log(state.board[i])
  //}
  console.log(state.spots.heads)

  return res.json(data)
})

module.exports = router
