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
    let winningMarker = ''
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
    const result = document.querySelector('#result-message')

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
                winningMarker = a
                break
            }
        }
        if (roundWon) {
            displayController.showWinModal()
            return
        }
        let roundDraw = !gameState.includes("")
        if (roundDraw) {
            displayController.showDrawModal()
        }
    }
    function winningMessage() {
        let message = ''
        if (winningMarker == 'X') {
            message = 'Player X wins the game!'
        }  else if (winningMarker == 'O') {
            message = 'Player O wins the game!'
        }
        result.textContent = message
    }
    function drawMessage() {
        'Game has ended in a draw' 
    }
    
    function clearBoard() {
        document.querySelectorAll('.gameBoard-divs').forEach(board => board.textContent = "")
        gameState = ["", "", "", "", "", "", "", "", ""]
        gamePiece = 'X'
    }
    document.addEventListener('click', (e) => {
        if (e.target.matches('.gameBoard-divs')) {
            if (e.target.textContent == '') {
                if (gamePiece === 'X') {
                    e.target.textContent = gamePiece
                    gamePiece = 'O'
                    gameState.splice(e.target.id, 1, e.target.textContent) // adds player selection to gameState
                } else {
                    e.target.textContent = gamePiece
                    gamePiece = 'X'
                    gameState.splice(e.target.id, 1, e.target.textContent)
                }
                checkScore()
            }
        }
    })
    return { 
        renderDisplay, clearBoard, checkScore, winningMessage, drawMessage,
     }
})()

const displayController = (() => {
    
    const modal = document.querySelector('.modal-container')
    const winModal = document.querySelector('.modal-win-container')
    const drawModal = document.querySelector('.modal-draw-container')
    const page = document.querySelector('#modal-wrapper')
    const playerOneInput = document.querySelector('#player-one')
    const playerTwoInput = document.querySelector('#player-two')

    gameBoard.renderDisplay()

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
        gameBoard.winningMessage()
    }
    function showDrawModal() {
        gameBoard.drawMessage()
        drawModal.style.display = 'block'
        page.classList.add('blur-background')
    }
    function modalCancel() {
        page.classList.remove('blur-background')
        modal.style.display = 'none'
        winModal.style.display = 'none'
        drawModal.style.display = 'none'
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
            if (winModal.style.display == 'block' || drawModal.style.display == 'block') {
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
        if (e.target == winModal || e.target == drawModal) {
            modalCancel()
            gameBoard.clearBoard()
        }
    })
    return {
        showPlayerModal, showWinModal, showDrawModal, modalCancel, setAndShowNames,
    }
})()