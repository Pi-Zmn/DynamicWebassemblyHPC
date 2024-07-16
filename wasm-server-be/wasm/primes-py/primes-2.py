import sys

def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def generate_primes(start, end, result):
    for i in range(start, end + 1):
        if is_prime(i):
            result.append(i)

if __name__ == '__main__':
    start_num = 1
    end_num = 100

    if len(sys.argv) == 3:
        start_num = int(sys.argv[1])
        end_num = int(sys.argv[2])

    result = []

    generate_primes(start_num, end_num, result)

    print(result)