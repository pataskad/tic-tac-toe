"use strict"

// the goal is for little global code as possible!
// the 'Module' pattern wraps the factory in an IIFE

// player object (factory function (IIFE?))

// gameBoard (array) (Module) (IIFE?)
const gameBoard = (() => {
    let board = []
     
    // 'DOM "cache"'/ quick lookup
    let gameBoardContainer = document.querySelector('#game-board-container')

    renderDisplay()

    function renderDisplay() {
        for (let i = 0; i < 9; i++) {
            board[i] = document.createElement('div')
            board[i].classList.add('gameBoard-divs')
            board[i].addEventListener('click', divClick)
            gameBoardContainer.appendChild(board[i])
        }
    }
    function divClick() {
        console.log('clicked')
    }
    return {
        renderDisplay: renderDisplay
    }
})()

// display controller (to control flow of the game) (Module)

// render gameBoard display (3x3 board, 9 total squares)