"use strict"

// the goal is for little global code as possible!
// the 'Module' pattern wraps the factory in an IIFE

// player object (factory function (NOT AN IIFE?))

// gameBoard (array) (Module) (IIFE?)
const gameBoard = (() => {
    let board = []  // reads as length of 9 when rendered
    let gamePiece = 'X'
     
    // 'DOM "cache"'/ quick lookup
    const gameBoardContainer = document.querySelector('#game-board-container')

    renderDisplay()

    function renderDisplay() {
        for (let i = 0; i < 9; i++) {
            board[i] = document.createElement('div')
            board[i].classList.add('gameBoard-divs')
            board[i].id = `${board.indexOf(board[i]) + 1}`
            gameBoardContainer.appendChild(board[i])
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
    return {    }
})()

// display controller (to control flow of the game) (Module)
const displayController = (() => {
    // check for win conditions, three in a row/tie
    // show winning message (modal?)
    // reset display to new game upon a button click
    
    // DOM 'cache'

    function clearBoard() {
        let board = document.querySelectorAll('.gameBoard-divs')
        for (let i = 0; i < board.length; i++) {
            board[i].textContent = ''
        }
    }
    document.addEventListener('click', (e) => {
        if (e.target.matches('#clear-gameBoard-btn')) {
            clearBoard()
        }
    })
    return {
        clearBoard: clearBoard,
    }
})()