import java.util.Scanner;

public class Connect_4 {
    private static final int ROWS = 6;
    private static final int COLS = 7;
    private int[][] board = new int[ROWS][COLS];
    private int currentPlayer = 1; // Player 1 is "1", Player 2 is "-1"

    public Connect_4() {
        initializeBoard();
    }
    //returns the winner (1, 0, or -1)
    public static int checkScore(int[][] board) {
        int count = 0;
        int previousPlayer = 0;
        //vertical
        for (int i = 0; i < 7; i++) {
            previousPlayer = 0;
            count = 0;
            for (int j = 0; j < 6; j++) {
                if (previousPlayer == board[j][i] || previousPlayer == 0) {
                    count++;
                    previousPlayer = board[j][i];
                } else {
                    count = 0;
                    if (board[j][i] == 0) {
                        j = 7;
                    } else {
                        previousPlayer = board[j][i];
                    }
                }
                if (count == 4) {
                    return previousPlayer;
                }
            }
        }
        //horizontal - faydhi
        for(int i = 0; i < 6; i++){
            previousPlayer = 0;
            count = 0;
            for (int j = 0; j < 7; j++){
                if(previousPlayer == board[i][j] || previousPlayer == 0){
                    count++;
                    previousPlayer = board[i][j];
                }
                else{
                    if (board[i][j] == 0){
                        j = 8;
                    }
                    else{
                        previousPlayer = board[i][j];
                        count = 0;
                    }
                }
                if (count == 4){
                    return previousPlayer;
                }
            }
        }

        //diagonal
        for (int j = 2; j >= 0; j--) {
            previousPlayer = 0;
            count = 0;
            int row = j;
            int col = 0;
            for (int i = 0; row + i < 6; i++) {
                if (previousPlayer == board[row + i][col + i] || previousPlayer == 0) {
                    count++;
                } else {
                    count = 0;
                }
                previousPlayer = board[row + i][col + i];
                if (count == 4) {
                    return previousPlayer;
                }
            }
        }
        for (int i = 0; i < 7; i++) {
            previousPlayer = 0;
            count = 0;
            for (int j = 0; j < 6 && i + j < 7; j++) {
                if (previousPlayer == board[j][i + j] || previousPlayer == 0) {
                    count++;
                } else {
                    count = 0;
                }
                previousPlayer = board[j][i + j];
                if (count == 4) {
                    return previousPlayer;
                }
            }
            previousPlayer = 0;
            count = 0;
            for (int j = 0; j < 6 && i - j >= 0; j++) {
                if (previousPlayer == board[j][i - j] || previousPlayer == 0) {
                    count++;
                } else {
                    count = 0;
                }
                previousPlayer = board[j][i - j];
                if (count == 4) {
                    return previousPlayer;
                }
            }
        }
        for (int j = 0; j < 3; j++) {
            previousPlayer = 0;
            count = 0;
            int row = j;
            int col = 7;
            for (int i = 0; col - i >= 0; i++) {
                if (previousPlayer == board[row + i][col - i] || previousPlayer == 0) {
                    count++;
                } else {
                    count = 0;
                }
                previousPlayer = board[row + i][col - i];
                if (count == 4) {
                    return previousPlayer;
                }
            }
        }
        return 0;
    }

    private void initializeBoard() {
        for (int row = 0; row < ROWS; row++) {
            for (int col = 0; col < COLS; col++) {
                board[row][col] = 0;
            }
        }
    }

    private void displayBoard() {
        for (int row = 0; row < ROWS; row++) {
            for (int col = 0; col < COLS; col++) {
                char symbol = getSymbolForCell(board[row][col]);
                System.out.print("| " + symbol + " ");
            }
            System.out.println("|");
        }
        System.out.println("-----------------------------");
    }

    private char getSymbolForCell(int cellValue) {
        if (cellValue == 1) return 'X';   
        if (cellValue == -1) return 'O'; 
        return '.'; 
    }

    // Make a move in the given column for the current player
    private boolean makeMove(int col) {
        if (col < 0 || col >= COLS || board[0][col] != 0) {
            System.out.println("Invalid move. Try again.");
            return false;
        }
        for (int row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] == 0) {
                board[row][col] = currentPlayer;
                return true;
            }
        }
        return false;
    }

    // Check for a win 
    private boolean checkWin() {
        // Placeholder for checking horizontal, vertical, and diagonal wins
        return false;
    }

    // Switch the current player
    private void switchPlayer() {
        currentPlayer = -currentPlayer;
    }

    public static void main(String[] args) {
        Connect_4 game = new Connect_4();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Welcome to Connect 4!");
        game.displayBoard();

        while (true) {
            System.out.println("Player " + (game.currentPlayer == 1 ? "1 (X)" : "2 (O)") + ", enter a column (0-6): ");
            int col = scanner.nextInt();

            if (game.makeMove(col)) {
                game.displayBoard();
                if (checkScore(game.board) != 0) {
                    System.out.println("Player " + (game.currentPlayer == 1 ? "1 (X)" : "2 (O)") + " wins!");
                    break;
                }
                game.switchPlayer();
            }
        }

        scanner.close();
    }
}
