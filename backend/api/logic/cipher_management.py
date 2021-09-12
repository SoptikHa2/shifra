from routes import Cipher


def is_cipher_solution_correct(cipher: Cipher, solution: str) -> bool:
    if cipher.solution is not None:
        # Compare string solutions
        return cipher.solution.strip().upper() == solution.strip().upper()

    # TODO: Run judge
    return False
