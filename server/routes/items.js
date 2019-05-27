var express = require('express')

const router = express.Router()

var data = {
    players: [],
    game_starting_date: null
}

router.get('/', function (req, res) {
     res.status(200).json(data)
})

router.post('/save-player', function (req, res) {
    const players_count = data.players.length

    if (players_count === 0) {
        const first_player = {id: 1}
        data.players.push(first_player)
        // send back id to player 1
        res.status(200).json(first_player)
    } else if (players_count === 1) {
        const second_player = {id: 2}
        data.players.push(second_player)
        // send back id to player 2
        res.status(201).json(second_player)
    } else {
        res.status(500).send('Enough users set!')
    }
})

router.put('/reset', function (req, res) {
    data.players = []
    data.game_starting_date = null

    res.status(201).json(data.players)
})

module.exports = router
