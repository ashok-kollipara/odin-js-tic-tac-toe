"use strict";

// IIFE Game setup
const ticTacToe = (() => {
    console.log("Setting up game");

    function createBoard() {
        const board = new Array(9)
        for (let i=0; i < board.length; i++) {
            board[i] = "."
        }
        return {
            board: board,
            player1: null,
            player2: null
        }
    }

    // setup game board
    const gameBoard = createBoard()

    //
    let currentChance = 0

    // get html elements
    const inputModal = document.querySelector(".input-modal")
    const formSubmitButton = document.querySelector("#submit-players")
    const startGameButton = document.querySelector(".start-game")
    const resetGameButton = document.querySelector(".reset-game")
    const viewBoard = document.querySelector(".game-board")
    const turnIndicator = document.querySelector(".show-current-turn")
    const resultDisplay = document.querySelector(".game-result")

    // handle bindings
    startGameButton.addEventListener("click", initGame)
    formSubmitButton.addEventListener("click", _getFormData)
    resetGameButton.addEventListener("click", resetGame)
    viewBoard.addEventListener("click", playHand)

    // play hand from button
    function playHand(event){
        console.log(event.target.id, "button got pressed")
        let arrayId = event.target.id.charAt(event.target.id.length - 1)
        arrayId = parseInt(arrayId)
        const status = _runGame(arrayId)
        console.log("Received status", status)
        if (status.result) {
            resultDisplay.innerHTML = status.result
            viewBoard.removeEventListener("click", playHand)
        } else if (status.updated === false) {
            console.log("Nothing to increment")
        } else {
            console.log("incrementing current chance")
            currentChance+=1
        }
    }

    // get input form data
    function _getFormData(event) {
        let p1_name
        let p2_name
        event.preventDefault()
        const form = document.querySelector(".player-details")
        const formData = new FormData(form)
        p1_name = formData.get("player1")
        p2_name = formData.get("player2")
        console.log("returning input name details", p1_name, p2_name)
        inputModal.close()
        startGame(p1_name, p2_name)
    }

    // initialize game 
    function initGame() {
        console.log("Collecting information for player names")
        inputModal.showModal()
    }

    // start game
    function startGame(p1_name, p2_name) {
        console.log("starting game for both players")
        p1_name = p1_name ? p1_name : "P1"
        p2_name = p1_name ? p2_name : "P2"
        console.log("Creating player objects now")
        gameBoard.player1 = _createPlayer(p1_name, "X")
        gameBoard.player2 = _createPlayer(p2_name, "O")
        _renderBoard()
    }

    // render board
    function _renderBoard() {
        if (currentChance == 0) {
            turnIndicator.innerHTML = `${gameBoard.player1.name} (${gameBoard.player1.sign}) Turn Now`
        }
        console.log("Rendering board")
        console.log(gameBoard.board[0], gameBoard.board[1], gameBoard.board[2])
        console.log(gameBoard.board[3], gameBoard.board[4], gameBoard.board[5])
        console.log(gameBoard.board[6], gameBoard.board[7], gameBoard.board[8])
        viewBoard.innerHTML = ""
        for (let i=0; i<gameBoard.board.length; i++) {
            let box = document.createElement("button")
            box.id = `box-${i}`
            box.classList.add("board-box") 
            box.innerHTML = gameBoard.board[i]
            viewBoard.appendChild(box)
        }
    }

    // run game
    function _runGame(pos) {
        console.warn("Gameboard length is", gameBoard.board.length)
        if (currentChance < gameBoard.board.length) {
            if (currentChance % 2 == 0) {
                const p1_chance = _markSign(gameBoard.player1.sign, pos)
                if (!p1_chance.updated) {
                    return {updated: false}
                }
                console.log(`${gameBoard.player1.name} marked spot in location ${p1_chance.pos}`)
                if (p1_chance.win) {
                    console.log(`${gameBoard.player1.name} won`)
                    return {result: `${gameBoard.player1.name} won`}
                }
                console.warn("Finished round:", currentChance+1)
                turnIndicator.innerHTML = `${gameBoard.player2.name} (${gameBoard.player2.sign}) Turn Now`
                return {updated: p1_chance.updated}
            } else {
                const p2_chance = _markSign(gameBoard.player2.sign, pos)
                if (!p2_chance.updated) {
                    return {updated: false}
                }
                console.log(`${gameBoard.player2.name} marked spot in location ${p2_chance.pos}`)
                if (p2_chance.win) {
                    console.log(`${gameBoard.player2.name} won`)
                    return {result: `${gameBoard.player2.name} won`}
                }
                console.warn("Finished round:", currentChance+1)
                turnIndicator.innerHTML = `${gameBoard.player1.name} (${gameBoard.player1.sign}) Turn Now`
                return {updated: p2_chance.updated}
            }
        } else {
            return { result: "drawn"}
        }
    }

    // mark sign
    function _markSign(sign, pos) {
        if (gameBoard.board[pos] != "X" || gameBoard.board[pos] != "X") {
            gameBoard.board[pos] = sign
            _renderBoard()
            return {pos: pos, win: _checkWinner(sign), updated: true}
        }
        return {updated: false}
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
