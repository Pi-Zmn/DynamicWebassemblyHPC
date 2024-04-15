#include <iostream>
#include <vector>
#include <cmath>

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

void generate_primes(unsigned long start, unsigned long end, std::vector<unsigned long>& result){
	for (unsigned long i = start; i < end + 1; i++) {
		if (is_prime(i)) {
			result.push_back(i);
		}
	}
}

int main(int argc, char *argv[]) {
    unsigned long start_num = 1;
    unsigned long end_num = 100;

    if (argc == 3) {
        start_num = std::stoul (argv[1],nullptr,0);
        end_num = std::stoul (argv[2],nullptr,0);
    }

    std::vector<unsigned long> result {};

	generate_primes(start_num, end_num, result);

    for (unsigned long i = 0; i < result.size(); i++) {
        std::cout << result.at(i) << std::endl;
    }
    return 0;
}