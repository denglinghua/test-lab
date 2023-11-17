import java.util.List;

public class App {
    public static void main(String[] args) throws Exception {
        App app = new App();
        // app.start();
        app.startCompare();
    }

    private Mancala ml = new Mancala();
    private MancalaAI ai = new MancalaAI();
    private FileLogger logger = new FileLogger("ml.txt");
    private FileLogger aiLogger = new FileLogger("ai.txt");

    private void startCompare() {
        log(showBoard(ml.getBoard()));
        aiLog(showBoard(ai.getBoard()));

        log("\nStart random moves...\n");
        aiLog("\nStart AI moves...\n");

        while (!ml.isGameOver()) {
            int movePit = randomMove();
            if(movePit >= 0) {
                // ai just follow human's movie
                moveAI(movePit);
            }
        }
    }

    private void log(String message) {
        logger.log(message);
    }

    private void aiLog(String message) {
        aiLogger.log(message);
    }

    private void start() {
        log(showBoard(ml.getBoard()));

        log("\nStart random moves...\n");
        
        while (!ml.isGameOver()) {
            randomMove();
        }
    }

    private String showBoard(int[] board) {
        StringBuilder sb = new StringBuilder();
        sb.append("  " + board[12] + " " + board[11] + " " + board[10] + " " + board[9] + " " + board[8] + " " + board[7]);
        sb.append("\n");
        sb.append(board[13] + "               " + board[6]);
        sb.append("\n");
        sb.append("  " + board[0] + " " + board[1] + " " + board[2] + " " + board[3] + " " + board[4] + " " + board[5]);
        return sb.toString();
    }

    private int randomMove() {
        int movePit = -1;
        if (ml.isGameOver()) {
            log("Game over!");
            return movePit;
        }

        int pitIndex = -1;
        int currentTurn = ml.getTurn();
        if (currentTurn == 1) {
            pitIndex = (int) (Math.random() * 6);
        } else {
            pitIndex = (int) (Math.random() * 6) + 7;
        }

        Mancala.MoveResult result = ml.move(pitIndex);
        if(result.valid) {
            log(String.format("%s", result));
            log(showBoard(ml.getBoard()));
            log("");
            movePit = result.pit;
        }
        return movePit;
    }

    private void moveAI(int pit) {
        this.ai.makeMove(pit);
        aiLog(showBoard(ai.getBoard()));
        aiLog("");
    }
}
