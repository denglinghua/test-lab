#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUFSIZE 256

// This program prints the size of a specified file in bytes
int main(int argc, char** argv) {
    // Ensure that the user supplied exactly one command line argument
    if (argc != 2) { 
        fprintf(stderr, "Please provide the address of a file as an input.\n");
        return -1;
    }

    // Check if the file exists and is readable
    if (access(argv[1], F_OK) == -1) {
        fprintf(stderr, "The file does not exist.\n");
        return -1;
    }

    // Open the file
    FILE *file = fopen(argv[1], "rb");
    if (file == NULL) {
        fprintf(stderr, "Failed to open the file.\n");
        return -1;
    }

    // Get the file size
    fseek(file, 0, SEEK_END);
    long fileSize = ftell(file);
    fclose(file);

    // Print the file size in the way that the wc command does
    printf("    %ld\n", fileSize);

    return 0;
}