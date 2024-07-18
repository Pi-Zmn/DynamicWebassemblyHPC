#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Function to compute the nth Fibonacci number recursively
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main(int argc, char *argv[]) {
    // Check if the correct number of arguments is provided
    if (argc != 2) {
        printf("Usage: %s <n>\n", argv[0]);
        return 1;
    }

    // Convert argument from string to integer
    int n = atoi(argv[1]);

    // Start timing
    clock_t start_time = clock();

    // Compute the nth Fibonacci number
    int result = fibonacci(n);

    // End timing
    clock_t end_time = clock();

    // Calculate the elapsed time in seconds
    double elapsed_time = (double)(end_time - start_time) / CLOCKS_PER_SEC;

    // Print the result
    printf("The %dth Fibonacci number is %d\n", n, result);
    printf("Computation took %.2f seconds\n", elapsed_time);

    return result;
}
