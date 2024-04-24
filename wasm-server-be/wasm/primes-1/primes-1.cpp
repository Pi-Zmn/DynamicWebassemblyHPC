#include <iostream>
#include <vector>
#include <cmath>
#include <chrono>

bool is_prime(unsigned long n) {
	if( n <= 1 ) {
		return false;
	}
	for(unsigned long i = 2; i < std::sqrt(n) + 1; i++) {
		if(n % i == 0) {
			return false;
		}
	}
	return true;
}

void generate_primes(unsigned long start,unsigned long end, std::vector<unsigned long>& result){
	for (unsigned long i = start; i < end + 1; i++) {
		if (is_prime(i)) {
			result.push_back(i);
		}
	}
}

int main(int argc, char *argv[]) {
    unsigned long start_num = 1;
    unsigned long end_num = 1000;
    std::vector<unsigned long> result {};

    if (argc == 3) {
        start_num = std::stoul (argv[1],nullptr,0);
        end_num = std::stoul (argv[2],nullptr,0);
    }

    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();
	generate_primes(start_num, end_num, result);
    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();

    /*
    for (unsigned long i : result) {
        std::cout << i << std::endl;
    }
    */

    std::cout << "Found " << result.size() << " Prime numbers!" << std::endl;
    std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count() << "[µs]" << std::endl;
    std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::nanoseconds> (end - begin).count() << "[ns]" << std::endl;
    std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::seconds>(end - begin).count() << "[s]" << std::endl;

    return 0;
}