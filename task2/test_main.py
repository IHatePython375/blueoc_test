import unittest
from task2_solution import sum_two_largest


class TestingModule(unittest.TestCase):
    def test_given_test_case(self):
        self.assertEqual(sum_two_largest([1, 4, 2, 3, 5]), 9)

    def test_two_elements(self):
        self.assertEqual(sum_two_largest([10, 20]), 30)

    def test_duplicate_largest(self):
        self.assertEqual(sum_two_largest([5, 5, 1, 2]), 10)

    def test_negative_numbers_only(self):
        self.assertEqual(sum_two_largest([-10, -3, -5, -1]), -4)

    def test_mixed_numbers(self):
        self.assertEqual(sum_two_largest([-2, 8, 3, 10, 1]), 18)

    def test_input_not_list(self):
        with self.assertRaises(TypeError):
            sum_two_largest("not a list")

    def test_element_not_integer(self):
        with self.assertRaises(TypeError):
            sum_two_largest([1, 2, "3"])

    def test_less_than_two_elements(self):
        with self.assertRaises(ValueError):
            sum_two_largest([7])


if __name__ == "__main__":
    unittest.main()