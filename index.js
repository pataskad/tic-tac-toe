"use strict"

const Player = name => {
    const sayPlayerOne = () => {
        const playerOneValue = document.querySelector('#player1')
        playerOneValue.textContent = name
    }
    const sayPlayerTwo = () => {
        const playerTwoValue = document.querySelector('#player2')
        playerTwoValue.textContent = name
    }
    return {
        sayPlayerOne, sayPlayerTwo,
    }
}
const gameBoard = (() => {
    let board = [] 
    let gamePiece = 'X'
    const winningConditions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [6, 4, 2],
    ]
    let gameState = ["", "", "", "", "", "", "", "", ""]
     
    const gameBoardContainer = document.querySelector('#game-board-container')

    function renderDisplay() {
        for (let i = 0; i < 9; i++) {
            board[i] = document.createElement('div')
            board[i].classList.add('gameBoard-divs')
            board[i].id = `${board.indexOf(board[i])}`
            gameBoardContainer.appendChild(board[i])
        }
    }
    function checkScore() {
        let roundWon = false
        for (let i = 0; i < 7; i++) {
            const winCondition = winningConditions[i]
            let a = gameState[winCondition[0]]
            let b = gameState[winCondition[1]]
            let c = gameState[winCondition[2]]
            if (a === '' || b === '' || c === '') {
                continue
            }
            if (a === b && b === c) {
                roundWon = true
                break
            }
        }
        if (roundWon) {
            displayController.showWinModal()
            console.log('Win!')
            return
        }
        let roundDraw = !gameState.includes("")
        if (roundDraw) {
            // add draw result modal and logic 
            console.log('Draw!')
        }
    }
    function clearBoard() {
        document.querySelectorAll('.gameBoard-divs').forEach(board => board.textContent = "")
        gameState = ["", "", "", "", "", "", "", "", ""]
    }
    document.addEventListener('click', (e) => {
        if (e.target.matches('.gameBoard-divs')) {
            if (e.target.textContent == '') {
                if (gamePiece === 'X') {
                    e.target.textContent = gamePiece
                    gamePiece = 'O'
                    gameState.splice(e.target.id, 1, e.target.textContent) // adds player selection to gameState
                    console.log(gameState)
                } else {
                    e.target.textContent = gamePiece
                    gamePiece = 'X'
                    gameState.splice(e.target.id, 1, e.target.textContent) // adds player selection to gameState
                    console.log(gameState)
                }
                checkScore()
            }
        }
    })
    return { 
        renderDisplay, clearBoard, checkScore,
     }
})()

const displayController = (() => {
    
    // DOM 'cache'
    const modal = document.querySelector('.modal-container')
    const winModal = document.querySelector('.modal-win-container')
    const page = document.querySelector('#modal-wrapper')
    const playerOneInput = document.querySelector('#player-one')
    const playerTwoInput = document.querySelector('#player-two')

    gameBoard.renderDisplay()

    const winningMessage = () => { // add to winning message
        if (gamePiece === 'X') {
            `Player ${playerOne} has won!`
        } else if (gamePiece === 'O') {
            `Player ${playerTwo} has won!`
        }
    }
    const drawMessage = () => 'Game has ended in a draw'

    function setAndShowNames() {
        let playerOne = Player(playerOneInput.value)
        let playerTwo = Player(playerTwoInput.value)
        if (playerOneInput.value == '' && playerTwoInput.value !== '') {
            playerTwo.sayPlayerTwo()
        } else if (playerTwoInput.value == '' && playerOneInput.value !== '') {
            playerOne.sayPlayerOne()
        } else if (playerOneInput.value !== '' && playerTwoInput.value !== '') {
            playerOne.sayPlayerOne()
            playerTwo.sayPlayerTwo()
        }
    }
    function showPlayerModal() {
        modal.style.display = 'block'
        page.classList.add('blur-background')
    }
    function showWinModal() {
        winModal.style.display = 'block'
        page.classList.add('blur-background')
    }
    function modalCancel() {
        page.classList.remove('blur-background')
        modal.style.display = 'none'
        winModal.style.display = 'none'
        playerOneInput.value = ''
        playerTwoInput.value = ''
        document.querySelector('#error-handler').textContent = ''
    }
    document.addEventListener('click', (e) => {
        if (e.target.matches('#clear-gameBoard-btn')) {
            gameBoard.clearBoard()
        }
        if (e.target.matches('#player-add')) {
            showPlayerModal()
        }
        if (e.target.matches('.close-button')) {
            if (winModal.style.display = 'block') {
                modalCancel()
                gameBoard.clearBoard()
            } else {
                modalCancel()  
            }
        }
        if (e.target.matches('#form-submit-btn')) {
            if (playerOneInput.value == '' && playerTwoInput.value == '') {
                document.querySelector('#error-handler').textContent = '* Please enter at least one player name *'
                playerOneInput.focus()
            } else {
                setAndShowNames()
                modalCancel()
            }
        }
        if (e.target == modal) {
            modalCancel()
        }
        if (e.target == winModal) {
            modalCancel()
            gameBoard.clearBoard()
        }
    })
    return {
        showPlayerModal, showWinModal, modalCancel, setAndShowNames, winningMessage, drawMessage,
    }
})()