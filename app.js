/*
GAME RULES
-The game has 2 players, playing in rounds
-In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
-BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the opponent's turn
-The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the opponent's turn
-The first player to reach 20 points on GLOBAL score wins the game
*/

// Selecting elements
const player0El = document.querySelector('.js-player0');
const player1El = document.querySelector('.js-player1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.js-dice')
const btnNew = document.querySelector('.js-btnNew');
const btnRoll = document.querySelector('.js-btnRoll');
const btnHold = document.querySelector('.js-btnHold');

let scores, currentScore, activePlayer, playing;

// Init
const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    btnRoll.disabled = false;
    btnHold.disabled = false;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('is-hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    btnRoll.classList.remove('is-disabled');
    btnHold.classList.remove('is-disabled');
};

init();

// Switch Player
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Disable Buttons
const disableBtns = () => {
    btnRoll.disabled = true;
    btnHold.disabled = true;
    btnRoll.classList.add('is-disabled');
    btnHold.classList.add('is-disabled');
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
    if(playing) {
        // Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6 + 1);
    
        // Display dice
        diceEl.classList.remove('is-hidden');
        diceEl.src = `dice-${dice}.png`;
    
        // Check for rolled 1: if true
        if(dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore;  // change later 
    
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// Hold the score
btnHold.addEventListener('click', () => {
    if(playing) {

        // Add  current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        // Check if player's score is >= 20
        if(scores[activePlayer] >= 20) {
            // Finish the game
            playing = false;
            disableBtns();
            diceEl.classList.add('is-hidden');
            document.querySelector(`.js-player${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.js-player${activePlayer}`).classList.remove('player--active');
        } else {

            // Switch to next player
            switchPlayer();
        }
    }
});

// Restart the game
btnNew.addEventListener('click', init);