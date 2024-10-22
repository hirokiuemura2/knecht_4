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
        for(int j = 0; j < 6; j++){
            previousPlayer = 0;
            count = 0;
            for (int i = 0; i < 7; i++){
                if(previousPlayer == board[j][i] || previousPlayer == 0){
                    count++;
                    previousPlayer = board[j][i];
                }
                else{
                    if (board[j][i] == 0){
                        i = 8;
                    }
                    else{
                        previousPlayer = board[j][i];
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
}