class Connect4 {
    constructor() {
        this.ROWS = 6;
        this.COLS = 7;
        this.board = Array.from({ length: this.ROWS }, () => Array(this.COLS).fill(0));
        this.currentPlayer = 1;
        this.initializeBoard();
    }


    initializeBoard() {
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                this.board[row][col] = 0;
            }
        }
    }

    displayBoard() {
        for (let row = 0; row < this.ROWS; row++) {
            let line = '';
            for (let col = 0; col < this.COLS; col++) {
                let symbol = this.getSymbolForCell(this.board[row][col]);
                line += `| ${symbol} `;
            }
            console.log(line + '|');
        }
        console.log('-----------------------------');
    }

    getSymbolForCell(cellValue) {
        if (cellValue === 1) return 'X';
        if (cellValue === -1) return 'O';
        return '.';
    }

    makeMove(col) {
        if (col < 0 || col >= this.COLS || this.board[0][col] !== 0) {
            console.log("Invalid move. Try again.");
            return false;
        }
        for (let row = this.ROWS - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = this.currentPlayer;
                return true;
            }
        }
        return false;
    }

    checkScore() {
        let count, previousPlayer;

        for (let i = 0; i <this.COLS; i++) {
            previousPlayer = 0;
            count = 0;
            for (let j = this.ROWS - 1; j >= 0; j--) {
                if (this.board[j][i] === 0) break;
                if (previousPlayer === this.board[j][i] || (previousPlayer === 0 && this.board[j][i] !== 0)) {
                    count++;
                    previousPlayer = this.board[j][i];
                } else {
                    count = this.board[j][i] !== 0 ? 1 : 0;
                    previousPlayer = this.board[j][i];
                }
                if (count === 4) return previousPlayer;
            }
        }
        for (let i = this.ROWS - 1; i >= 0; i--) {
            previousPlayer = 0;
            count = 0;
            for (let j = 0; j < this.COLS; j++) {
                if (this.board[i][j] !== 0 && (previousPlayer === this.board[i][j] || previousPlayer === 0)) {
                    count++;
                    previousPlayer = this.board[i][j];
                } else {
                    count = this.board[i][j] !== 0 ? 1 : 0;
                    previousPlayer = this.board[i][j];
                } 
                if (count === 4) return previousPlayer;
            }
        }
        const directions = [
            { rowStep: -1, colStep: 1 },
            { rowStep: -1, colStep: -1 }
        ];
        for (const { rowStep, colStep } of directions) {
            for (let startRow = this.ROWS - 1; startRow >= 3; startRow) {
                for (let startCol = 0; startCol < this.COLS - 3; startCol++) {
                    previousPlayer = 0;
                    count = 0;
                    for (let i = 0; i < 4; i++) {
                        const row = startRow + i * rowStep;
                        const col = startCol + i * colStep;
                        if (this.board[row][col] === 0) {
                            count = 0;
                            break;
                        }
                        if (previousPlayer === this.board[row][col] || previousPlayer === 0) {
                            count++;
                            previousPlayer = this.board[row][col];
                        } else {
                            count = 1;
                            previousPlayer = this.board[row][col];
                        }
                        if (count === 4) return previousPlayer;
                    }
                }
            }
        }
        return 0;
    }

    switchPlayer() {
        this.currentPlayer = -this.currentPlayer;
    }

    play() {
        console.log("Wlcome to Connect 4!");
        this.displayBoard();

        while (true) {
            //let col = parseInt(prompt(`Player ${this.currentPlayer === 1 ? '1 (X)' : '2 (0)'}: Enter a column (0-6)`), 10);


            if (this.makeMove(col)) {
                this.displayBoard();
                let winner = this.checkScore();
                if (winner !== 0) {
                    console.log(`Player ${winner === 1 ? '1 (X)' : '2 (0)'} wins!`);
                    break;
                }
                this.switchPlayer();
            }
        }
    }

}

let newGame = new Connect4();

let bigContainer = document.createElement('div');
bigContainer.classList.add('bigContainer');
const container = document.querySelector('body');
container.appendChild(bigContainer);

// const allSquares = document.querySelectorAll('.square');

let updateSquares = () => {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach((square) => {
        console.log(square);
        let row = square.classList[1].charAt(3);
        // console.log(square.parentElement.classList[1]);
        let col = square.parentElement.classList[1].charAt(3);
        let player = newGame.board[row][col];
        square.textContent = player == -1 ? 'O' : player == 1 ? 'X' : ' ';
    })
    console.log("updated");
    return;
}

let otherSquare = null;
let addSquares = (rows, cols) => {
    for (let j = 0; j < cols; j++) {
        let newContainer = document.createElement('div');
        bigContainer.append(newContainer);
        newContainer.classList.add('colContainer', 'col' + j);
        for (let i = 0; i < rows; i++) {
            let squareContainer = document.createElement('div');
            newContainer.append(squareContainer);
            squareContainer.classList.add('square');
            squareContainer.classList.add("row"+ i);
            squareContainer.textContent="";
            squareContainer.addEventListener('mouseover', () => {
                // edit later
                otherSquare = bigContainer.querySelector('.col' + j).querySelector('.row5');
                otherSquare.style.backgroundColor = 'blue';
            });
            squareContainer.addEventListener('click', () => {
                let x = 10;
                let y = 10;
                //function call to select column
                newGame.makeMove(squareContainer.parentElement.classList[1].charAt(3));
                newGame.displayBoard();
                updateSquares();
                newGame.switchPlayer();
                // newGame.checkScore();
                // 
                // 
                console.log(squareContainer.classList);
            });
            squareContainer.addEventListener('mouseleave', () => {
                if (otherSquare) {
                    otherSquare.style.backgroundColor = "white";
                }
                squareContainer.style.backgroundColor = "white";
            });
        }
    }
}

addSquares(6,7);



let reset = document.querySelector('.reset');
// reset.addEventListener('click',() => {
//     updateSquares();
// });


newGame.displayBoard();
updateSquares();