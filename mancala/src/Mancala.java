import java.util.stream.IntStream;

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
        initGame();
    }

    public void resetGame() {
        initGame();
    }

    private void initGame() {
        board = new int[2 * PITS + 2]; // two extra pits for the stores
        for (int i = 0; i < PITS; i++) {
            board[i] = STONES; // fill the pits with stones
            board[i + PITS + 1] = STONES; // skip the store of player 1
        }
        turn = 1;
        gameOver = false;
    }

    private IntStream getPlayerPits(int player) {
        if (player == 1) {
            return IntStream.range(0, PITS);
        }

        if (player == 2) {
            return IntStream.range(PITS + 1, 2 * PITS + 1);
        }
        
        return null;
    }

    // Maps the pit index to the display purpose
    public static int mapPitIndexToDisplay(int pit) {
        if (pit >= 0 && pit < PITS) {
            return pit + 1;
        } else if (pit > PITS && pit < 2 * PITS + 1) {
            return pit - PITS;
        } else {
            return -1;
        }
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
    private static boolean isMovePitValid(int turn, int pit) {
        if (turn == 1 && (pit >= 0 && pit < STORE1_INDEX)) {
            return true;
        }
        if (turn == 2 && (pit > PITS && pit < STORE2_INDEX)) {
            return true;
        }
        return false;
    }

    // Distributes the stones in the pit
    private int distributeStones(int pit) {
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

        return index;
    }

    // Makes a move for the current player
    // The parameter is the index of the pit to be selected
    // Returns true if the move is valid, false otherwise
    public MoveResult move(int pit) {
        MoveResult result = new MoveResult(this.turn, pit);
        result.valid = false;
        if (!isMovePitValid(turn, pit)) {
            result.description = "invalid pit";
            return result;
        }

        if (board[pit] == 0) { // the pit is empty
            result.description = "empty pit";
            return result;
        }

        result.stones = board[pit];
        result.valid = true;

        int index = distributeStones(pit);

        if (turn == 1 && index == STORE1_INDEX) { // player 1 ends in their own store
            turn = 1; // player 1 gets another turn
            result.description = "get turn";
        } else if (turn == 2 && index == STORE2_INDEX) { // player 2 ends in their own store
            turn = 2; // player 2 gets another turn
            result.description = "get turn";
        } else if (board[index] == 1) { // the last stone is placed in an empty pit
            boolean captured = tryCaptureOpposite(index);
            if (captured) {
                result.description = "capture";
            } else {
                result.description = "switch turn";
            }

            switchTurn();
        } else { // the last stone is placed in a non-empty pit
            switchTurn();
            result.description = "switch turn";
        }

        checkGameOver(); // check if the game is over
        return result;
    }

    private void switchTurn() {
        this.turn = this.turn == 1 ? 2 : 1;
    }

    // Captures the opposite pit if the last stone is placed in an empty pit
    private boolean tryCaptureOpposite(int pit) {
        int oppositeIndex = -1;
        int storeIndex = turn == 1 ? STORE1_INDEX : STORE2_INDEX;
        if (turn == 1 && pit < STORE1_INDEX) { // player 1 captures the opposite pit
            oppositeIndex = 2 * PITS - pit;
        } else if (turn == 2 && pit > STORE1_INDEX && pit < STORE2_INDEX) { // player 2 captures the opposite pit
            oppositeIndex = 2 * PITS - pit;
        }

        boolean captureOpposite = oppositeIndex > 0;
        if (captureOpposite) {
            board[storeIndex] += board[oppositeIndex] + 1; // add the stones to their store
            board[pit] = 0; // empty the pit
            board[oppositeIndex] = 0; // empty the opposite pit
        }

        return captureOpposite;
    }

    // Checks if the game is over
    // The game is over when one side has no more stones in their pits
    // The remaining stones are moved to the respective stores
    private void checkGameOver() {
        int sum1 = getPlayerPits(1).map(i -> board[i]).sum();
        int sum2 = getPlayerPits(2).map(i -> board[i]).sum();
        if (sum1 == 0) { // player 1 has no more stones
            gameOver = true; 
            board[STORE2_INDEX] += sum2; // move the remaining stones to player 2's store
            getPlayerPits(2).forEach(i -> board[i] = 0);
        } else if (sum2 == 0) { // player 2 has no more stones
            gameOver = true; 
            board[STORE1_INDEX] += sum1; // move the remaining stones to player 1's store
            getPlayerPits(1).forEach(i -> board[i] = 0);
        }
    }

    // Returns the winner of the game
    // 1 for player 1, 2 for player 2
    // 0 for a tie
    // -1, game is not over
    public int getWinner() {
        if (!gameOver) {
            return -1;
        }

        int player1Stones = board[STORE1_INDEX];
        int player2Stones = board[STORE2_INDEX];
        return player1Stones > player2Stones ? 1 : player1Stones < player2Stones ? 2 : 0;
    }

    public class MoveResult {
        public final int turn;
        public final int pit;
        public int stones;
        public boolean valid;
        public String description;

        public MoveResult(int turn, int pit) {
            this.turn = turn;
            this.pit = pit;
            this.stones = 0;
            this.valid = true;
            this.description = "";
        }

        @Override
        public String toString() {
            return String.format("%sp:%s(%s):%s", turn, mapPitIndexToDisplay(pit), stones, description);
        }
    }
}
