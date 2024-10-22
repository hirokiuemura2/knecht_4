import java.util.Scanner;

public class Connect_4 {
    private static final int ROWS = 6;
    private static final int COLS = 7;
    private int[][] board = new int[ROWS][COLS];
    private int currentPlayer = 1; // Player 1 is "1", Player 2 is "-1"

    public Connect_4() {
        initializeBoard();
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
                if (game.checkWin()) {
                    System.out.println("Player " + (game.currentPlayer == 1 ? "1 (X)" : "2 (O)") + " wins!");
                    break;
                }
                game.switchPlayer();
            }
        }

        scanner.close();
    }
}
