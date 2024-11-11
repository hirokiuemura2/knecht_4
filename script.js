class Connect4 {
    constructor(gameMode, difficulty = 'medium') {
        console.log(gameMode);
        this.ROWS = 6;
        this.COLS = 7;
        this.board = Array.from({ length: this.ROWS }, () => Array(this.COLS).fill(0));
        this.currentPlayer = 1; // Human player starts (1 = Human, -1 = AI)
        this.hasBeenWon = false;
        this.gameMode = gameMode; // Store the selected game mode
        this.difficulty = difficulty; // Store the difficulty level (easy, medium, hard)
        this.initializeBoard();
        this.displayBoard();
    }

    initializeBoard() {
        this.board = Array.from({ length: this.ROWS }, () => Array(this.COLS).fill(0));
        this.currentPlayer = 1; // Start with human player
        this.hasBeenWon = false;
        document.getElementById("statusMessage").textContent = "Player 1's turn";
        document.getElementById("statusMessage2").textContent = "";
    }

    displayBoard() {
        const container = document.getElementById('bigContainer');
        container.innerHTML = ''; // Clear previous board content
        for (let col = 0; col < this.COLS; col++) {
            const colContainer = document.createElement('div');
            colContainer.classList.add('colContainer');
            colContainer.dataset.col = col;

            // Create rows for this column
            for (let row = 0; row < this.ROWS; row++) {
                const cell = document.createElement('div');
                cell.classList.add('square');
                cell.dataset.row = row;

                colContainer.appendChild(cell);
            }

            // Append the column container to the main container
            container.appendChild(colContainer);
            
            // Add event listener to the column container
            colContainer.addEventListener('click', () => {
                if (!this.hasBeenWon && (this.currentPlayer === 1 || this.gameMode === "player")) {
                    this.makeMove(col);
                }
            });
            //adds mouse hovering listeners to create appropriate shading
            colContainer.addEventListener('mouseover', () => {
                const items = colContainer.querySelectorAll('.square');
                for (let r = this.ROWS - 1; r >= 0; r--) {
                    if (this.board[r][col] === 0) {
                        items.forEach((squareTemp) => {
                            if (parseInt(squareTemp.dataset.row) === r) {
                                squareTemp.style.backgroundColor = '#333';
                            }
                        });
                        r = -1;
                    }
                }
            });
            colContainer.addEventListener('mouseleave', () => {
                const items = colContainer.querySelectorAll('.square');
                items.forEach(squareTemp => {
                    squareTemp.style.backgroundColor = 'black';
                });
            });
        }
    }
    makeMove(col) {
        if (this.hasBeenWon) return;
        if (this.board[0][col] !== 0) {
            document.getElementById("statusMessage2").textContent = "Please choose a different column.";
            return;
        };
        document.getElementById("statusMessage2").textContent = "";
        for (let row = this.ROWS - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = this.currentPlayer;
                this.updateBoard();
                if (this.checkWin(row, col)) {
                    document.getElementById("statusMessage").textContent = `Player ${this.currentPlayer === 1 ? '1' : '2'} wins!`;
                    this.hasBeenWon = true;
                } else {
                    this.currentPlayer *= -1;
                    document.getElementById("statusMessage").textContent = `Player ${this.currentPlayer === 1 ? '1' : '2'}'s turn`;
                    
                    // Trigger AI move only if it's AI's turn
                    if (this.currentPlayer === -1 && this.gameMode !== 'player') this.aiMove();
                    this.checkDraw();
                }
                
                break;
            }
        } 
    }

    checkDraw() {
        var numFree = 0;
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLS; j++) {
                if (this.board[i][j] === 0) {
                    numFree++;
                }
            }
        }
        if (numFree === 0) {
            console.log("Hello, all filled");
            document.getElementById("statusMessage").textContent = "Draw!";
            document.getElementById("statusMessage2").textContent = "Please reset or choose new game mode to continue playing.";
            this.hasBeenWon = true;
        }
    }

    aiMove() {
        if (this.hasBeenWon) return; // Prevent AI from moving if game has been won

        let bestMove;
        switch (this.difficulty) {
            case 'easy':
                bestMove = this.easyAI(); // Easy AI (random move)
                break;
            case 'medium':
                bestMove = this.mediumAI(); // Medium AI (minimax with shallow depth)
                break;
            case 'hard':
                bestMove = this.hardAI(); // Hard AI (minimax with deep depth)
                break;
            default:
                bestMove = this.mediumAI(); // Default to medium
                break;
        }

        setTimeout(() => {
            if (!this.hasBeenWon && this.currentPlayer === -1) { // Check again before AI moves
                this.makeMove(bestMove);
            }
        }, 500); // Delay to simulate AI thinking
    }

    resetGame() {
        this.initializeBoard();
        this.displayBoard();
    }


    easyAI() {
        // Random move for easy AI
        const availableColumns = this.getAvailableMoves();
        return availableColumns[Math.floor(Math.random() * availableColumns.length)];
    }

    mediumAI() {
        const availableColumns = this.getAvailableMoves();
        let bestScore = -Infinity;
        let bestMove = availableColumns[0];
      
        for (const col of availableColumns) {
          let row = this.getNextAvailableRow(col);
          this.board[row][col] = -1; // Simulate move
          let score = this.minimax(2, -Infinity, Infinity, false); // Shallow depth
          this.board[row][col] = 0; // Undo move
      
          if (score > bestScore) {
            bestScore = score;
            bestMove = col;
          }
        }
      
        // If all moves have equal score, choose randomly
        if (bestScore === -Infinity) {
          bestMove = availableColumns[Math.floor(Math.random() * availableColumns.length)];
        }
      
        return bestMove;
      }
      
      hardAI() {
        const availableColumns = this.getAvailableMoves();
        let bestScore = -Infinity;
        let bestMove = availableColumns[0];
      
        for (const col of availableColumns) {
          let row = this.getNextAvailableRow(col);
          this.board[row][col] = -1; // Simulate move
          let score = this.minimax(4, -Infinity, Infinity, false); // Deep depth
          this.board[row][col] = 0; // Undo move
      
          if (score > bestScore) {
            bestScore = score;
            bestMove = col;
          }
        }
      
        // If all moves have equal score, choose randomly
        if (bestScore === -Infinity) {
          bestMove = availableColumns[Math.floor(Math.random() * availableColumns.length)];
        }
      
        return bestMove;
      }

    getAvailableMoves() {
        const moves = [];
        for (let col = 0; col < this.COLS; col++) {
            if (this.board[0][col] === 0) {
                moves.push(col);
            }
        }
        return moves;
    }

    updateBoard() {
        const cells = document.querySelectorAll('.square');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.parentNode.dataset.col, 10);
            const player = this.board[row][col];
            cell.style.backgroundColor = '';

            cell.classList.remove('x', 'o');
            if (player === 1) {
                if (cell.childElementCount === 0) {
                    //adding red circle for player 3
                    let circle = document.createElement('div');
                    circle.classList.add('circle');
                    circle.style.backgroundColor = 'red';
                    cell.appendChild(circle);
                }
            } else if (player === -1) {
                //adding blue circle for player 2
                if (cell.childElementCount === 0) {
                    let circle = document.createElement('div');
                    circle.classList.add('circle');
                    circle.style.backgroundColor = 'blue';
                    cell.appendChild(circle);
                }
            } else {
                cell.textContent = ''; // Clear cell if empty
            }
            //make circle fall into place if it has been placed.
            if (cell.childElementCount !== 0) {
                setTimeout(() => {
                    cell.querySelector('.circle').style.transform = "translateY(0px)";
                }, 1);
            }
        });
    }


    checkWin(row, col) {
        return this.checkDirection(row, col, 1, 0) || 
               this.checkDirection(row, col, 0, 1) || 
               this.checkDirection(row, col, 1, 1) || 
               this.checkDirection(row, col, 1, -1);
    }

    checkDirection(row, col, rowStep, colStep) {
        let count = 1;
        count += this.countInDirection(row, col, rowStep, colStep);
        count += this.countInDirection(row, col, -rowStep, -colStep);
        return count >= 4;
    }

    countInDirection(row, col, rowStep, colStep) {
        let count = 0;
        let currentRow = row + rowStep;
        let currentCol = col + colStep;
        while (this.isInBounds(currentRow, currentCol) && this.board[currentRow][currentCol] === this.currentPlayer) {
            count++;
            currentRow += rowStep;
            currentCol += colStep;
        }
        return count;
    }

    isInBounds(row, col) {
        return row >= 0 && row < this.ROWS && col >= 0 && col < this.COLS;
    }

    minimax(depth, alpha, beta, isMaximizingPlayer) {
        const availableColumns = this.getAvailableMoves();
        if (depth === 0 || availableColumns.length === 0 || this.hasBeenWon) {
          return { score: this.evaluateBoard() };
        }
      
        let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
        let bestColumn = null;
      
        for (const col of availableColumns) {
          const row = this.getNextAvailableRow(col);
          this.board[row][col] = isMaximizingPlayer ? -1 : 1;
      
          const score = this.minimax(depth - 1, alpha, beta, !isMaximizingPlayer).score;
      
          this.board[row][col] = 0;
      
          if (isMaximizingPlayer) {
            if (score > bestScore) {
              bestScore = score;
              bestColumn = col;
            }
            alpha = Math.max(alpha, bestScore);
          } else {
            if (score < bestScore) {
              bestScore = score;
              bestColumn = col;
            }
            beta = Math.min(beta, bestScore);
          }
      
          // If alpha and beta have converged, prune the search
          if (beta <= alpha) {
            break;
          }
        }
      
        // If no best move was found, choose a random one
        if (bestColumn === null) {
          bestColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
        }
      
        return { score: bestScore, column: bestColumn };
      }
    evaluateBoard() {
        let score = 0;
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                if (this.board[row][col] !== 0) {
                    score += this.evaluatePosition(row, col, this.board[row][col]);
                }
            }
        }

        return score;
    }

    evaluatePosition(row, col, player) {
        let score = 0;
      
        // Direct scoring opportunities (unchanged)
        score += this.checkLine(row, col, 1, 0, player); // Horizontal
        score += this.checkLine(row, col, 0, 1, player); // Vertical
        score += this.checkLine(row, col, 1, 1, player); // Diagonal \
        score += this.checkLine(row, col, 1, -1, player); // Diagonal /
      
        // Penalize placing near opponent's potential threats
        for (let rowStep = -1; rowStep <= 1; rowStep++) {
          for (let colStep = -1; colStep <= 1; colStep++) {
            if (rowStep === 0 && colStep === 0) continue; // Skip self
            const nextRow = row + rowStep;
            const nextCol = col + colStep;
            if (this.isInBounds(nextRow, nextCol) && this.board[nextRow][nextCol] === -player) {
              score -= this.checkLine(nextRow, nextCol, 1, 0, -player); // Horizontal
              score -= this.checkLine(nextRow, nextCol, 0, 1, -player); // Vertical
              score -= this.checkLine(nextRow, nextCol, 1, 1, -player); // Diagonal \
              score -= this.checkLine(nextRow, nextCol, 1, -1, -player); // Diagonal /
            }
          }
        }
      
        return score;
      }

    checkLine(row, col, rowStep, colStep, player) {
        let score = 0;
        let count = 0;
        for (let i = 0; i < 4; i++) {
            const currentRow = row + i * rowStep;
            const currentCol = col + i * colStep;

            if (this.isInBounds(currentRow, currentCol)) {
                if (this.board[currentRow][currentCol] === player) {
                    count++;
                } else if (this.board[currentRow][currentCol] !== 0) {
                    break;
                }
            }
        }
        if (count === 4) {
            score += 1000; // Win
        } else if (count === 3) {
            score += 100; // Close to winning
        } else if (count === 2) {
            score += 10; // Potential to win
        }
        return score;
    }

    getNextAvailableRow(col) {
        for (let row = this.ROWS - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                return row;
            }
        }
        return -1;
    }
}
window.onload = function() {
    const modeButtons = document.querySelectorAll('#modeSelection button');
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.id.replace('playerVs', '').toLowerCase();
            const difficulty = mode.includes('ai') ? mode.split('ai')[1].toLowerCase() : 'medium';
            const game = new Connect4(mode, difficulty);
            
            // Add reset button functionality
            document.getElementById('resetButton').onclick = () => game.resetGame();
        });
    });
};