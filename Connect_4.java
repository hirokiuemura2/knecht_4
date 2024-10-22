public class Connect_4 {
    public static void main(String[] args) {
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
                if (previousPlayer == board[i][j] || previousPlayer == 0) {
                    count++;
                    previousPlayer = board[i][j];
                } else {
                    if (board[i][j] == 0) {
                        j = 7;
                    } else {
                        previousPlayer = board[i][j];
                        count = 0;
                    }
                }
                if (count == 4) {
                    return previousPlayer;
                }
            }
        }
        //horizontal - faydhi

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
                previousPlayer = board[row + i][col + 1];
                if (count == 4) {
                    return previousPlayer;
                }
            }
        }
        for (int i = 0; i < 7; i++) {
            previousPlayer = 0;
            count = 0;
            for (int j = 0; j < 6; j++) {
            }
            previousPlayer = 0;
            count = 0;
            for (int j = 0; j < 6; j++) {
            }
        }
        return 0;
    }
}