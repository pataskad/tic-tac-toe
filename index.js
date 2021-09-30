"use strict"

const Player = name => {
    const sayPlayerOne = () => {
        const playerOneValue = document.querySelector('#player1')
        playerOneValue.textContent = name
        let marker = 'X'
    }
    const sayPlayerTwo = () => {
        const playerTwoValue = document.querySelector('#player2')
        playerTwoValue.textContent = name
        let marker = 'O'
    }
    return {
        sayPlayerOne, sayPlayerTwo,
    }
}
const gameBoard = (() => {
    let board = []  // reads as length of 9 when rendered
    let gamePiece = 'X'
     
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
        const winConditions = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [6, 4, 2],
        ]
        for (let i = 0; i < winConditions.length; i++) {
            for (let j = 0; j < winConditions[i].length; j++) {
                // check for win conditions
                // track by id??
            }
        }
    }
    function clearBoard() {
        const board = document.querySelectorAll('.gameBoard-divs')
        for (let i = 0; i < board.length; i++) {
            board[i].textContent = ''
        }
    }
    document.addEventListener('click', (e) => {
        if (e.target.matches('.gameBoard-divs')) {
            if (e.target.textContent == '') {
                if (gamePiece === 'X') {
                    e.target.textContent = gamePiece
                    gamePiece = 'O'
                } else {
                    e.target.textContent = gamePiece
                    gamePiece = 'X'
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
    function showModal() {
        modal.style.display = 'block'
        page.classList.add('blur-background')
    }
    function modalCancel() {
        page.classList.remove('blur-background')
        modal.style.display = 'none'
        playerOneInput.value = ''
        playerTwoInput.value = ''
        document.querySelector('#error-handler').textContent = ''
    }
    document.addEventListener('click', (e) => {
        if (e.target.matches('#clear-gameBoard-btn')) {
            gameBoard.clearBoard()
        }
        if (e.target.matches('#player-add')) {
            showModal()
        }
        if (e.target.matches('.close-button')) {
            modalCancel()
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
    })
    return {
        showModal, modalCancel, setAndShowNames,
    }
})()