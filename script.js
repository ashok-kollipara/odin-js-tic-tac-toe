"use strict";

// IIFE Game setup
const ticTacToe = (() => {
    console.log("Setting up game");

    function createBoard() {
        const board = new Array(9)
        for (let i=0; i < board.length; i++) {
            board[i] = "_"
        }
        return {
            board: board,
            player1: null,
            player2: null
        }
    }

    // setup game board
    const gameBoard = createBoard()

    // start game
    function startGame() {
        console.log("take input for player1")
        gameBoard.player1 = _createPlayer("P1", "X")
        gameBoard.player2 = _createPlayer("P2", "O")
        const result = _runGame()
        console.log("Game result:", result)
        resetGame()
    }

    // render board
    function _renderBoard() {
        console.log("Rendering board")
        console.log(gameBoard.board[0], gameBoard.board[1], gameBoard.board[2])
        console.log(gameBoard.board[3], gameBoard.board[4], gameBoard.board[5])
        console.log(gameBoard.board[6], gameBoard.board[7], gameBoard.board[8])
    }

    // run game
    function _runGame() {
        console.warn("Gameboard length is", gameBoard.board.length)
        for (let i=0; i<gameBoard.board.length; i++) {
            if (i%2 == 0) {
                const p1_pos = parseInt(prompt("Player 1 position").trim())
                const p1_chance = _markSign(gameBoard.player1.sign, p1_pos)
                console.log(`player 1 marked spot in location ${p1_chance.pos}`)
                if (p1_chance.win) {
                    console.log("Player 1 won")
                    return {result: "player 1 won"}
                }
            } else {
                const p2_pos = parseInt(prompt("Player 2 position").trim())
                const p2_chance = _markSign(gameBoard.player2.sign, p2_pos)
                console.log(`player 2 marked spot in location ${p2_chance.pos}`)
                if (p2_chance.win) {
                    console.log("Player 2 won")
                    return {result: "player 2 won"}
                }
            }
            console.warn("Finished round:", i+1)
        }
        return { result: "drawn"}
    }

    // mark sign
    function _markSign(sign, pos) {
        gameBoard.board[pos] = sign
        console.log(gameBoard.board)
        _renderBoard()
        return {pos: pos, win: _checkWinner(sign)}
    }

    // check for winner
    function _checkWinner(sign) {
        // check all rows
        console.warn("Checking winner for ", sign)
        const r1 = ((gameBoard.board[0] === gameBoard.board[1]) && (gameBoard.board[1] === gameBoard.board[2]))
        if ( r1 && (gameBoard.board[0] === sign)) {
            return true
        }
        const r2 = ((gameBoard.board[3] === gameBoard.board[4]) &&  (gameBoard.board[4] === gameBoard.board[5]))
        if ( r2 && (gameBoard.board[3] === sign)) {
            return true
        }
        const r3 = ((gameBoard.board[6] === gameBoard.board[7]) &&  (gameBoard.board[7] === gameBoard.board[8]))
        if ( r3 && (gameBoard.board[6] === sign)) {
            return true
        }

        // check all column
        const c1 = (gameBoard.board[0] === gameBoard.board[3]) && (gameBoard.board[3]=== gameBoard.board[6])
        if ( c1 && (gameBoard.board[0] === sign)) {
            return true
        }
        const c2 = (gameBoard.board[1] === gameBoard.board[4])  && (gameBoard.board[4]=== gameBoard.board[7])
        if ( c2 && (gameBoard.board[1] === sign)) {
            return true
        }
        const c3 = (gameBoard.board[2] === gameBoard.board[5]) && (gameBoard.board[5] === gameBoard.board[8])
        if ( c3 && (gameBoard.board[2] === sign)) {
            return true
        }
        
        // check all diagonals
        const d1 = (gameBoard.board[0] === gameBoard.board[4]) && (gameBoard.board[4]=== gameBoard.board[8])
        if ( d1 && (gameBoard.board[0] === sign)) {
            return true
        }
        const d2 = (gameBoard.board[2] === gameBoard.board[4]) && ( gameBoard.board[4] === gameBoard.board[6])
        if ( d2 && (gameBoard.board[2] === sign)) {
            return true
        }
    }

    // reset game
    function resetGame() {
        console.warn("resetting game")
        gameBoard.board = new Array(9)
    }

    // create players
    function _createPlayer(name, sign) {
        return {name: name, sign: sign}
    }

    // expose only required methods to global
    return { start: startGame, reset: resetGame}

})()
