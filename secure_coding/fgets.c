#include <stdio.h>

#define BUFSIZE 32

// The fgets() function keeps on reading characters until:
// (n-1) characters have been read from the stream.
// a newline character is encountered.
// end of file (EOF) is reached.
// fgets terminates at the newline character but appends it at the end of the string str. 
// The function also appends the terminating null character at the end of the passed string.
// return s on success, and NULL on error or when end of file occurs while no characters have been read.
int read_file(const char *filename) {
    FILE* ptr = fopen(filename, "r");
    
    if (ptr == NULL) {
        fprintf(stderr, "File '%s' cannot be opened.\n", filename);
        return -1;
    }
    
    char buff[BUFSIZE];
    
    while (fgets(buff, BUFSIZE, ptr) != NULL) {
        printf("%s", buff);
    }
    
    fclose(ptr);
    return 0; 
}

// This program prints the size of a specified file in bytes
int main(int argc, char** argv) {
    // Ensure that the user supplied exactly one command line argument
    if (argc != 2) { 
        fprintf(stderr, "Please provide the address of a file as an input.\n");
        return -1;
    }

    read_file(argv[1]);

    return 0;
}