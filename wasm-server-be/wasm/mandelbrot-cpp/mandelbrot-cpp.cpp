#include <emscripten.h>

#include <iostream>
#include <complex>
#include <chrono>

using namespace std;
using namespace std::chrono;

// Function to compute Mandelbrot iterations for a given complex number
int mandelbrot(complex<double> c, int max_iter) {
    complex<double> z = 0;
    int n = 0;

    while (abs(z) <= 2.0 && n < max_iter) {
        z = z * z + c;
        n++;
    }

    return n;
}

// Mandelbrot calculation over a 2D area defined by xmin, xmax, ymin, ymax
void calculate_mandelbrot(double xmin, double xmax, double ymin, double ymax, int width, int height, int max_iter) {
    for (int x = 0; x < width; ++x) {
        for (int y = 0; y < height; ++y) {
            // Map pixel position to complex plane
            double real = xmin + (x / (double)width) * (xmax - xmin);
            double imag = ymin + (y / (double)height) * (ymax - ymin);
            complex<double> c(real, imag);

            // Perform Mandelbrot iteration and ignore result (no visualization)
            mandelbrot(c, max_iter);
        }
    }
}

EMSCRIPTEN_KEEPALIVE
void wasmMain(double xmin, double xmax, double ymin, double ymax) {
    // Settings for calculation
    const int width = 512;     // Resolution width
    const int height = 512;    // Resolution height
    const int max_iter = 250;  // Maximum number of iterations

    // Start measuring time
    auto start = high_resolution_clock::now();

    // Calculate Mandelbrot set in the specified region
    calculate_mandelbrot(xmin, xmax, ymin, ymax, width, height, max_iter);

    // Stop measuring time
    auto end = high_resolution_clock::now();

    // Print Computing Time
    cout << "Mandelbrot calculation completed in " << duration_cast<nanoseconds>(end - start).count() << "[ns]" << endl;
    cout << "Mandelbrot calculation completed in " << duration_cast<microseconds>(end - start).count() << "[µs]" << endl;
    cout << "Mandelbrot calculation completed in " << duration_cast<milliseconds>(end - start).count() << "[ms]" << endl;
    cout << "Mandelbrot calculation completed in " << duration_cast<seconds>(end - start).count() << "[s]" << endl;
}

int main(int argc, char *argv[]) {
    // Set default region bounds
    double xmin = -2.0;
    double xmax = 1.0;
    double ymin = -1.5;
    double ymax = 1.5;

    // Parse command-line arguments for region bounds
    if (argc == 5) {
        xmin = atof(argv[1]);
	xmax = atof(argv[2]);
	ymin = atof(argv[3]);
	ymax = atof(argv[4]);
    }

    wasmMain(xmin, xmax, ymin, ymax);

    return 0;
}
