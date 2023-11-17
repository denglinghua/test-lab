public class App {
    public static void main(String[] args) throws Exception {
        Mancala ml = new Mancala();
        showBoard(ml);

        System.out.println("\nRandom moves:\n");
        while (!ml.isGameOver()) {
            randomMove(ml);
        }
    }

    private static void showBoard(Mancala ml) {
        int[] board = ml.getBoard();
        System.out.println("  " + board[12] + " " + board[11] + " " + board[10] + " " + board[9] + " " + board[8] + " " + board[7]);
        System.out.println(board[13] + "               " + board[6]);
        System.out.println("  " + board[0] + " " + board[1] + " " + board[2] + " " + board[3] + " " + board[4] + " " + board[5]);
    }

    private static void randomMove(Mancala ml) {
        if (ml.isGameOver()) {
            System.out.println("Game over!");
            return;
        }

        int pitIndex = -1;
        int currentTurn = ml.getTurn();
        if (currentTurn == 1) {
            pitIndex = (int) (Math.random() * 6);
        } else {
            pitIndex = (int) (Math.random() * 6) + 7;
        }

        ml.makeMove(pitIndex);
        showBoard(ml);
        System.out.println(currentTurn + "p : " + pitIndex);
        System.out.println();
    }
}
