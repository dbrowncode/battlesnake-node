var express = require('express')
var router  = express.Router()
var taunts = ["Z", "A", "L", "G", "O"]
var moves = ['up', 'left', 'down', 'right']

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#DFFF00",
    name: "Zalgo",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "woop", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move

  // Response data
  var data = {
    move: moves[req.body.turn % moves.length], // one of: ['up','down','left','right']
    taunt: taunts[req.body.turn % taunts.length], // optional, but encouraged!
  }
  //console.log(req.body.turn)

  return res.json(data)
})

module.exports = router
