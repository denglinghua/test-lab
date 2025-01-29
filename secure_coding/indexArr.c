int getValueFromArray0(int *array, int len, int index) {
    return array[index];
}

int getValueFromArray1(int *array, int len, int index) {
    // Return the element from the array at the specified index
    if (index < 0 || index >= len) {
        return -1;
    }
    return array[index];
}