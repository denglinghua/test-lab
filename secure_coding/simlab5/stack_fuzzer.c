#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// stack commands list, not including EXIT
const char *commands[] = {
    "ISEMPTY",
    "ISFULL",
    "PUSH",
    "POP",
    "PEEK",
};

// prints a valid sequence of at most max_number_of_commands
// into standard output stream
void stack_fuzzer(int max_number_of_commands) {
    for (int i = 0; i < max_number_of_commands; i++) {
        int command_index = rand() % (sizeof(commands) / sizeof(commands[0]));
        const char *command = commands[command_index];
        printf("%s\n", command);
        // if the command is PUSH, append a random number
        if (strcmp(command, "PUSH") == 0) {
            printf("%d\n", rand());
        }
    }
    printf("EXIT\n");
}

int main() {
    // use current time as a seed for the pseudorandom
    // number generator
    srand(time(NULL));
    stack_fuzzer(10);
}
