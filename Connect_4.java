public class Connect_4 {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
    //returns the winner (1, 0, or -1)
    public static int checkScore(int[][] board) {
        int count = 0;
        int previousPlayer = 0;
        //vertical
        for (int i = 0; i < 7; i++) {
            previousPlayer = 0;
            for (int j = 0; j < 6; j++) {
                if (previousPlayer == board[i][j] || previousPlayer == 0) {
                    count++;
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
        return 0;
    }
}