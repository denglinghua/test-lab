import java.io.FileWriter;
import java.io.IOException;

public class FileLogger {
    private FileWriter fileWriter;

    public FileLogger(String filename) {
        try {
            fileWriter = new FileWriter(filename, false);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void log(String message) {
        try {
            fileWriter.write(message + "\n");
            fileWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}