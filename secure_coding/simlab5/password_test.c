#include <assert.h>
#include "password.h"

#define TRUE 1
#define FALSE 0

int main() {
    assert(is_valid_password("length7") == FALSE); // too short
    assert(is_valid_password("length8!") == FALSE); // missing uppercase letter
    assert(is_valid_password("LENGTH8!") == FALSE); // missing lowercase letter
    assert(is_valid_password("Length!!") == FALSE); // missing digit
    assert(is_valid_password("Length88") == FALSE); // missing special character

    assert(is_valid_password("Length8!") == TRUE); // valid

    assert(is_valid_password("A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!50") == TRUE); // 50 characters
    assert(is_valid_password("A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A51") == FALSE); // 51 characters
}

// run result: 
// Assertion failed: (is_valid_password("A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A1b2c3d!A51") == FALSE), function main, file password_test.c, line 17.

// Conclusion: 
// the function is_valid_password() does not check the maximum length of the password.
