from math import floor


class converter:

    diff = ord('A') - ord('9') - 1

    def dec_to_36(self, number: int):
        result = ""

        base = 36
        while number != 0:
            remainder = floor(number % base)
            number = floor(number / base)
            if remainder > 9:
                remainder += self.diff
            result += chr(remainder + ord('0'))

        return result[::-1]
