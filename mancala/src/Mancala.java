public class Mancala {

    public static final int PITS = 6;
    public static final int STONES = 4;

    private int[] board;
    private static final int STORE1_INDEX = PITS;
    private static final int STORE2_INDEX = 2 * PITS + 1;

    // 1 for player 1, 2 for player 2
    private int turn;

    private boolean gameOver;

    public Mancala() {
        board = new int[2 * PITS + 2]; // two extra pits for the stores
        for (int i = 0; i < PITS; i++) {
            board[i] = STONES; // fill the pits with stones
            board[i + PITS + 1] = STONES; // skip the store of player 1
        }
        turn = 1;
        gameOver = false;
    }

    public int[] getBoard() {
        return board;
    }

    public int getTurn() {
        return turn;
    }

    public boolean isGameOver() {
        return gameOver;
    }

    // the pit is moving is valid?
    private static boolean isPitValid(int turn, int pit) {
        if (turn == 1 && (pit >= 0 && pit < STORE1_INDEX)) {
            return true;
        }
        if (turn == 2 && (pit > PITS && pit < STORE2_INDEX)) {
            return true;
        }
        return false;
    }

    // A method that makes a move for the current player
    // The parameter is the index of the pit to be selected
    // The method returns true if the move is valid, false otherwise
    public boolean makeMove(int pit) {
        if (!isPitValid(turn, pit)) {
            return false;
        }

        if (board[pit] == 0) { // the pit is empty
            return false;
        }

        int stones = board[pit]; // get the number of stones in the pit
        board[pit] = 0; // empty the pit
        int index = pit; // start from the pit
        while (stones > 0) { // while there are still stones to distribute
            index = (index + 1) % (2 * PITS + 2); // go to the next pit in clockwise order
            if (turn == 1 && index == STORE2_INDEX) { // player 1 skips player 2's store
                continue;
            }
            if (turn == 2 && index == STORE1_INDEX) { // player 2 skips player 1's store
                continue;
            }
            board[index]++; // add one stone to the pit
            stones--; // decrease the number of stones
        }

        if (turn == 1 && index == STORE1_INDEX) { // player 1 ends in their own store
            System.out.println("1 player gets another turn");
            turn = 1; // player 1 gets another turn
        } else if (turn == 2 && index == STORE2_INDEX) { // player 2 ends in their own store
            System.out.println("2 player gets another turn");
            turn = 2; // player 2 gets another turn
        } else if (board[index] == 1) { // the last stone is placed in an empty pit
            int storeIndex = -1, oppositeIndex = -1;
            if (turn == 1 && index < STORE1_INDEX) { // player 1 captures the opposite pit
                storeIndex = STORE1_INDEX;
                oppositeIndex = 2 * PITS - index;
            } else if (turn == 2 && index > STORE1_INDEX && index < STORE2_INDEX) { // player 2 captures the opposite pit
                storeIndex = STORE2_INDEX;
                oppositeIndex = PITS - (index - PITS - 1);
            }

            boolean captureOpposite = oppositeIndex > 0;
            if (captureOpposite) {
                board[storeIndex] += board[oppositeIndex] + 1; // add the stones to their store
                board[index] = 0; // empty the pit
                board[oppositeIndex] = 0; // empty the opposite pit
            }
            
            switchTurn();
        } else { // the last stone is placed in a non-empty pit
            switchTurn();
        }
        checkGameOver(); // check if the game is over
        return true; // the move is valid
    }

    private void switchTurn() {
        this.turn = this.turn == 1 ? 2 : 1;
    }

    // A helper method that checks if the game is over
    // The game is over when one side has no more stones in their pits
    // The remaining stones are moved to the respective stores
    private void checkGameOver() {
        int sum1 = 0; // the sum of stones in player 1's pits
        int sum2 = 0; // the sum of stones in player 2's pits
        for (int i = 0; i < PITS; i++) {
            sum1 += board[i]; // add the stones in player 1's pits
            sum2 += board[i + PITS + 1]; // add the stones in player 2's pits
        }
        if (sum1 == 0) { // player 1 has no more stones
            gameOver = true; // the game is over
            board[STORE2_INDEX] += sum2; // move the remaining stones to player 2's store
            for (int i = PITS + 1; i < 2 * PITS + 1; i++) {
                board[i] = 0; // empty the pits
            }
        } else if (sum2 == 0) { // player 2 has no more stones
            gameOver = true; // the game is over
            board[STORE1_INDEX] += sum1; // move the remaining stones to player 1's store
            for (int i = 0; i < PITS; i++) {
                board[i] = 0; // empty the pits
            }
        }
    }

    // A method that returns the winner of the game
    // The winner is the player who has more stones in their store
    // The method returns 1 for player 1, 2 for player 2, or 0 for a tie
    public int getWinner() {
        if (!gameOver) { // the game is not over yet
            return -1; // no winner yet
        }

        int player1Stones = board[STORE1_INDEX];
        int player2Stones = board[STORE2_INDEX];
        if (player1Stones > player2Stones) { // player 1 has more stones
            return 1; // player 1 wins
        } else if (player1Stones < player2Stones) { // player 2 has more stones
            return 2; // player 2 wins
        } else { // both players have the same number of stones
            return 0; // it is a tie
        }
    }
}
