"use strict"

// the goal is for little global code as possible!
// the 'Module' pattern wraps the factory in an IIFE

// player object (factory function (NOT AN IIFE typically), use 'function' instead of const shorthand?)
const Player = name => {
    const sayPlayerOne = () => {
        const playerOneValue = document.querySelector('#player1')
        playerOneValue.textContent = name//document.querySelector('#player-one').value
    }
    const sayPlayerTwo = () => {
        const playerTwoValue = document.querySelector('#player2')
        playerTwoValue.textContent = name//document.querySelector('#player-two').value
    }
    return {
        sayPlayerOne, sayPlayerTwo,
    }
}

// gameBoard (array) (Module) (IIFE?)
const gameBoard = (() => {
    let board = []  // reads as length of 9 when rendered
    let gamePiece = 'X'
     
    const gameBoardContainer = document.querySelector('#game-board-container')

    function renderDisplay() {
        for (let i = 0; i < 9; i++) {
            board[i] = document.createElement('div')
            board[i].classList.add('gameBoard-divs')
            board[i].id = `${board.indexOf(board[i]) + 1}`
            gameBoardContainer.appendChild(board[i])
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
                    // run win condition test, include test for when all squares marked, but no winner

                } else {
                    e.target.textContent = gamePiece
                    gamePiece = 'X'
                    // run win condition test, include test for when all squares marked, but no winner
                }
            }
        }
    })
    return { 
        renderDisplay, clearBoard,
     }
})()

// display controller (to control flow of the game) (Module)
const displayController = (() => {
    // check for win conditions, three in a row/tie
    // show winning message (modal?)
    
    // DOM 'cache'
    const modal = document.querySelector('.modal-container')
    const page = document.querySelector('#modal-wrapper')
    const playerOneInput = document.querySelector('#player-one')
    const playerTwoInput = document.querySelector('#player-two')

    gameBoard.renderDisplay()

    function setAndShowNames() {
        // allows for users to only update one players name depending on which fields are submitted 
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
            setAndShowNames()
            modalCancel()
        }
        if (e.target == modal) {
            modalCancel()
        }
    })
    return {
        showModal, modalCancel, setAndShowNames,
    }
})()