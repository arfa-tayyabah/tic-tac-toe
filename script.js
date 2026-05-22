let isXturn = true;
let xScore = 0;
let oScore = 0;
let gameActive = true;
const WinPattern = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
               [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];

const buttons = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const playBtn = document.getElementById("play-btn");
const msgDiv = document.querySelector(".win-message");
const scoreXSpan = document.getElementById("score-x");
const scoreOSpan = document.getElementById("score-o");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!gameActive) return;
        
        if (btn.innerText === "") {
            if (isXturn) {
                btn.innerText = 'X';
                isXturn = false;
            } else {
                btn.innerText = 'O';
                isXturn = true;
            }
            checkWin();
        }
    });
});

function checkWin() {
    let winner = null;
    
    for (let pattern of WinPattern) {
        const val0 = buttons[pattern[0]].innerText;
        const val1 = buttons[pattern[1]].innerText;
        const val2 = buttons[pattern[2]].innerText;

        if (val0 !== "" && val1 !== "" && val2 !== "" && val0 === val1 && val1 === val2) {
            winner = val0;
            break;
        }
    }
    
    if (winner) {
        if (winner === 'X') {
            xScore++;
            scoreXSpan.textContent = xScore;
        } else {
            oScore++;
            scoreOSpan.textContent = oScore;
        }
        
        gameActive = false;
        showMessage(`Player ${winner} wins! 🎉`);
        disableAllButtons();
        return;
    }
    
    let isTie = true;
    for (let btn of buttons) {
        if (btn.innerText === "") {
            isTie = false;
            break;
        }
    }
    
    if (isTie) {
        gameActive = false;
        showMessage("It's a Tie! 🤝");
        disableAllButtons();
    }
}

function disableAllButtons() {
    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

function enableAllButtons() {
    buttons.forEach(btn => {
        btn.disabled = false;
    });
}

function showMessage(message) {
    msgDiv.textContent = message;
    msgDiv.style.display = "block";
    
    setTimeout(() => {
        msgDiv.style.display = "none";
        resetGame();
    }, 1500);
}

function resetGame() {
    gameActive = true;
    isXturn = true;
    
    buttons.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
    });
}

function newGame() {
    xScore = 0;
    oScore = 0;
    scoreXSpan.textContent = xScore;
    scoreOSpan.textContent = oScore;
    resetGame();
}

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        resetGame();
    });
}

if (playBtn) {
    playBtn.addEventListener("click", () => {
        newGame();
    });
}