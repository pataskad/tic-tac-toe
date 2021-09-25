"use strict"

// the goal is for little global code as possible!
// the 'Module' pattern wraps the factory in an IIFE

// player object (factory function (NOT AN IIFE typically), use 'function' instead of const shorthand?)
/* const Player = (name) => {
    const playerName = () => name

    const showName = () => {
        console.log('this function works!')
        console.log(playerName)
    }
    return {
        showName, playerName,
    }
} */

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
                } else {
                    e.target.textContent = gamePiece
                    gamePiece = 'X'
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
        if (e.target == modal) {
            modalCancel()
        }
    })
    return {
        showModal, modalCancel,
    }
})()